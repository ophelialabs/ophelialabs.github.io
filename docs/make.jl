"""
Documenter.jl build script forMyDocumentation

This script builds the documentation site and can be run with:
    julia --project=docs docs/make.jl

Configuration and build process:
- Loads the package from the parent directory
- Processes Markdown sources from docs/src/
- Generates HTML documentation
- Deploys to GitHub Pages (when run in CI)
"""

using Documenter

# Add parent directory to load path for local package
push!(LOAD_PATH, "..")
using MyDocumentation

# Determine environment (CI or local)
is_ci = get(ENV, "CI", false) == "true" || get(ENV, "GITHUB_ACTIONS", "false") == "true"

# Determine remotes based on environment
remotes = if is_ci
    nothing  # Let deploydocs() handle remotes on CI
else
    nothing  # Disable for local development
end

# Define the documentation structure
makedocs(
    # Site metadata
    sitename="MyDocumentation.jl",
    authors="Your Name",
    remotes=remotes,
    
    # Build options
    clean=true,
    doctest=false,  # Set to true to run doctests
    linkcheck=false,  # Set to true to validate external links
    
    # Source and build directories
    source="src",
    build="build",
    
    # Page structure - customize this to match your documentation
    pages=[
        "Home" => "index.md",
        "Guide" => [
            "Getting Started" => "guide/getting_started.md",
            "Tutorial" => "guide/tutorial.md",
            "Advanced Usage" => "guide/advanced.md",
        ],
        "Medical" => [
            "Overview" => "medical/index.md",
            "Diagnostics" => "medical/diagnostics.md",
            "Imaging" => "medical/imaging.md",
        ],
        "Networking" => [
            "Overview" => "networking/index.md",
            "Protocols" => "networking/protocols.md",
        ],
        "Robotics" => [
            "Overview" => "robotics/index.md",
            "Control" => "robotics/control.md",
            "Sensing" => "robotics/sensing.md",
        ],
        "Algorithms" => [
            "hyperQUEEN" => "algorithms/hyperqueen.md",
            "Algorithm2" => "api/algorithm2.md",
        ],
    ],
    
    # HTML format configuration for GitHub Pages compatibility
    format = Documenter.HTML(
        prettyurls = is_ci,  # Enable pretty URLs on CI/GitHub Pages
        canonical = "https://ophelialabs.github.io/",  # Your documentation URL
        # Note: omitting assets uses Documenter's default theme (CSS/JS/styling)
    ),
)

# Deploy documentation to GitHub Pages
# This is called by GitHub Actions workflow
# On CI, use GITHUB_TOKEN passed through environment
github_token = get(ENV, "GITHUB_TOKEN", nothing)
repo_url = if is_ci && github_token !== nothing
    "https://$(github_token)@github.com/ophelialabs/ophelialabs.github.io.git"
else
    "github.com/ophelialabs/ophelialabs.github.io.git"
end

deploydocs(
    repo=repo_url,
    target="build",
    branch="gh-pages",
    devbranch="main",
    push_preview=false,
)

# Note: Also supports DOCUMENTER_KEY environment variable for SSH deployment
