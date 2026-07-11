*Based on the principles of minimally-invasive fiber-based neural interfaces (FED/BMI), irritation can be caused due to a combination of mechanical friction, foreign body reactions, and localized skin sensitivity* **(injection site)**.

## Why these specific areas are PRONE to irritation:
[how to make hearing aid at home।diy hearing aid circuit।hearing aids](https://www.youtube.com/watch?v=tL1OCiPa2k4),
[How to make mic preamplifier circuit using bc547//Loud And Clear Sound // Creativedipu](https://www.youtube.com/watch?v=1kIN3Mc8M6k),
[How to make Mic Pre Amplifier Circuit // without Transistor//Microphone making in Hindi](https://www.youtube.com/watch?v=rM_s7yKSKyM)

[Edrawax](https://edrawmax.wondershare.com/templates/hearing-aid-circuit-diagram.html) | [Visio](https://www.microsoft.com/en-us/microsoft-365/visio) | [Draw IO](https://app.diagrams.net/#)

[Complete Set DIY Electronics](https://www.amazon.com/DIY-Electronics-Component-Box-Kit/dp/B0CT5LCN2H/ref=pd_sbs_d_sccl_1_4/140-8221409-3923004?pd_rd_w=KLqlZ&content-id=amzn1.sym.aa738fbd-ad05-4d11-aae2-04b598db6305&pf_rd_p=aa738fbd-ad05-4d11-aae2-04b598db6305&pf_rd_r=Q04KRE62ZSD2VKTKRN2E&pd_rd_wg=bthCI&pd_rd_r=778813af-40ef-4058-bcae-9131a39c4c54&pd_rd_i=B0CT5LCN2H&psc=1) or [SunFounder Elite Explorer Kit with Original Arduino](https://www.amazon.com/SunFounder-Bluetooth-Tutorials-Beginners-Engineers/dp/B0CR6K5WKK/ref=sr_1_29?crid=15X8KRZ9OT1P4&dib=eyJ2IjoiMSJ9.3XHFL9OmzekFEUMRY5K2AmW4xMpeNMCvdBHmOKKUVxc3XBE2N3zULXJoBSq9oHiO1kbsYtVuPaC4F9GFZ09YGqxx2hW2k4A6ZhlgzM-GIEQOXIMYFRf3IkPGrlNJNW0yGa4vZykDMqb8KbvnVbdHkywbKLc9rvvgfckY4it_OhRrdOyYcBgkdIFRzvhUEJnvFB9rLUMG2CTRaabwlgVi8V7PZKt6HZqy133dmIgZLylxDqknFY3YfE2T9bDXUwE1J8P7EpN25CGQYS2xLPyeiorBwtrMIznHlWltMUgOc7g.l5X8WxBS7EsrhOGCxkwgKA0ndOX8r6Wt1Lo5T-T_gOw&dib_tag=se&keywords=electronics+kit&qid=1783719529&sprefix=electronics%2Caps%2C259&sr=8-29) with [8pcs Piezoelectric Sensor](https://www.amazon.com/XIITIA-Piezoelectric-Ceramic-Vibration-Piezoelectricity/dp/B0D5HKZGF2/ref=sr_1_4?crid=1XR45IAGK6PGV&dib=eyJ2IjoiMSJ9.60QXfByjEp5Uc6fThRpfMQ-AhqyGx1mqJJZ5jycyO3BCWOnYTINRbYrHR86apyQSveEiwWCj_V4CDVzgXbtknTtkZoJMJ34kw-1IVP0QNGvfE5rafwAVapT6iUWZbBEhR2c-e_uD1tAezoKe4mhmHcKZ0rbRX-4nbDp_N2xrnwqPoW6kLdNsqxpq41Gqf85ESducUIsovxdkIJWdJV890GovGfD-U8BJzedH6cFieRk.szzd7x_Dpv-i02MIvR1Dk2r9d3XBN3dSw-KoZd1JNAU&dib_tag=se&keywords=piezoelectric+ceramic+vibration+sensor&qid=1783720235&sprefix=piezoelectric+cera%2Caps%2C189&sr=8-4)

1. Behind the Ear: Pressure and Allergic Reaction
   The area behind the ear is often used for mounting components
   - Faster Signal Transmission:
   - Decoding Accuracy:
   - Ground Electrode Placement:
   - Reference Point:
   - SpiralE:
   - Labeling Convention:
   - Positioning (E,J,H):
   - Sprial Config:
   - A2, M2, cEEGrid Layout:

**Why the Right Ear Map is Unique**:
- Allows the BCI to access the left hemisphere's lang and motor processing centers more efficiently. Less noise than cross-head

2. Apex (Top of the Head): Implant Site and Material Mismatch
   -
   -
   -
3. Load the Neural Data
   - NeuroAnalyzer.jl:
   - NeroFormats.jl:
   - ManifoldEEG.jl
   - Preprocessing: Images.jl
4. Visual Reconstruction (The "Decoding" Step)
   - Latent Rep:
   - Deep Learning:
5. Vis
   - ImageView.jl
### Summary of Key Factors
   -
   -
   -
### Pro-Tip:
[DABI](https://dabi.loni.usc.edu/), [DANDI](https://registry.opendata.aws/dandiarchive/) use Julia's HTTP and JSON pkg's to pull datasets directly into environment for real-time decoding.

# Data Arrival
To automate documentation generation based on new data (like MRI files or images), you need a Data-Driven CI/CD Pipeline. Instead of triggering the build only when code changes, you trigger it when data is updated or uploaded.
- Here is the architectural flow for an automated imaging documentation pipeline:
---
## 1. The Trigger
You need a way to signal the pipeline that new MRI data is ready.
- GitHub/GitLab Actions: If the data is small enough to stay in Git (unlikely for MRI), a simple git push triggers the build.
- Webhooks (Recommended): If you store data in S3, Google Cloud Storage, or a local server, you can configure a Webhook to ping GitHub Actions or your CI server whenever a new file is uploaded to a specific folder.
- Scheduled Runs (Cron): If you gather data daily, set the pipeline to run every night at 2:00 AM:
```
yaml
on:
  schedule:
    - cron: '0 2 * * *'
```

## 2. The Integration: ImageView.jl to Static Image
ImageView.jl is designed for interactive GUI use. For documentation (Documenter.jl), you must convert these views into static exports (PNG/SVG) or interactive notebooks.
- For Static Docs: Use FileIO.jl or Images.jl to save the MRI slice as a .png during the build process and reference it in your markdown.
- For Interactive Docs: Use a Pluto Notebook that loads the MRI data and uses WGLMakie.jl or Hyperscript.jl to create a web-based slice viewer.

## 3.  The Pipeline Workflow (GitHub Actions Example)
Here is how the automated pipeline handles the "Data → Doc" transition:
```
yaml
name: Data-Driven Documentation
on:
  repository_dispatch: # Triggered via API call from your data server
    types: [new-mri-data]
  workflow_dispatch:      # Allows manual trigger

jobs:
  build-docs:
    runs-on: ubuntu-latest
    container: my-julia-docker-image:latest # Using the Dockerfile we discussed
    steps:
      - uses: actions/checkout@v4

      # 1. Download the new data (e.g., from an S3 bucket)
      - name: Fetch MRI Data
        run: |
          curl -O https://your-data-store.com
          mv latest_scan.nii.gz ./docs/src/assets/data/

      # 2. Run a script to generate images/plots from the MRI
      - name: Process Imaging
        run: julia --project=docs ./docs/scripts/process_mri.jl

      # 3. Export Pluto Notebooks (with the new data)
      - name: Export Pluto
        run: julia --project=docs -e 'using PlutoSliderServer; export_directory("docs/src/notebooks")'

      # 4. Build Documenter.jl
      - name: Build Documenter
        run: julia --project=docs docs/make.jl

      # 5. Deploy to Netlify or GitHub Pages
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/build
```

## 4. Handling Large Imaging Data
MRI files are often too large for GitHub. To keep your documentation fast:
1. Downsample: Have your process_mri.jl script generate low-resolution thumbnails or specific 2D slices for the main documentation pages.
2. External Storage: Host the full NIfTI/DICOM files on a cloud provider and have the documentation link to them.
3. Artifacts.jl: Use Julia's Artifact system to manage the data. You can host the data anywhere, and Julia will automatically download, hash-verify, and cache it during the documentation build.

## Summary
- Docker: Ensure your Docker image contains imaging libraries (like ImageMagick or TestImages).
- Processing Script: Create a .jl script that reads the MRI and saves a static .png into docs/src/assets/.
- Webhook: Set up your data collection device to send a POST request to the GitHub API to kick off the build.

# Automate a Gallery
To automate a gallery of MRI slices for Documenter.jl, your script should perform three tasks: process the medical data (e.g., NIfTI), save the slices as web-friendly images, and generate a Markdown file that Documenter can render.

## 1. The Processing Script (generate_gallery.jl)
Place this script in your docs/ folder. It uses NIfTI.jl to read the data and Images.jl to export PNGs.
```
julia
using NIfTI, Images, FileIO

# 1. Configuration
data_path = "docs/src/assets/data/scan.nii.gz"
output_dir = "docs/src/assets/plots/mri_slices"
gallery_md = "docs/src/mri_gallery.md"
mkpath(output_dir)

# 2. Load MRI Data
mri = niread(data_path)
data = mri.raw  # 3D Array

# 3. Extract Slices & Save Images
# We'll take 5 equidistant slices along the Z-axis
z_dim = size(data, 3)
slice_indices = round.(Int, range(1, z_dim, length=5))

image_paths = []
for (i, idx) in enumerate(slice_indices)
    slice = data[:, :, idx]
    
    # Normalize data for PNG (0.0 to 1.0)
    img = colorview(Gray, slice ./ maximum(slice))
    
    img_name = "slice_$(idx).png"
    img_path = joinpath(output_dir, img_name)
    save(img_path, img)
    
    # Path relative to the docs/src/ folder for Markdown
    push!(image_paths, "assets/plots/mri_slices/$(img_name)")
end

# 4. Generate the Markdown Gallery File
open(gallery_md, "w") do io
    println(io, "# MRI Slice Gallery")
    println(io, "Generated on: $(Base.Dates.now())\n")
    println(io, "| Slice Index | Preview |")
    println(io, "|:---:|:---|")
    for (idx, path) in zip(slice_indices, image_paths)
        println(io, "| $idx | ![$idx]($path) |")
    end
end
```

## 2. Integration into make.jl
You must run this generation script before calling makedocs. This ensures the .md file and images exist when Documenter scans the src/ directory.
```
julia
using Documenter

# Run the gallery generator first
include("generate_gallery.jl")

makedocs(
    sitename = "My MRI Project",
    pages = [
        "Home" => "index.md",
        "MRI Gallery" => "mri_gallery.md",  # This is the generated file
    ]
)
```

## Why this works
- Automation: Every time your pipeline runs, the script checks for new data in assets/data/ and refreshes the gallery.
- Markdown Tables: Using a table for the gallery keeps the layout clean and aligned within Documenter's standard theme.
- Relative Paths: Images are saved in assets/, which Documenter automatically copies to the final build/ folder for deployment.

## Greta
The Gamma Ray Energy Tracking Array (GRETA) is a high-resolution spherical spectrometer designed to study the structure and properties of atomic nuclei by "tracking" individual gamma-ray interactions. 

Currently transitioning from its predecessor, GRETINA (which covered only 1 or one-quarter of a sphere), GRETA is a full 4 array that will be installed at the Facility for Rare Isotope Beams (FRIB) in 2026. 

## Core Technology & Design
- Detector Composition: The array consists of 120 hyper-pure germanium (HPGe) crystals arranged in 30 "quad" modules.
- Segmentation: Each crystal is segmented into 36 separate electrical elements. This allows the detector to identify the exact 3D position (within 1–2 mm) and energy of every interaction as a gamma ray scatters through the germanium.
- Cryogenic Cooling: To maintain high resolution and minimize thermal noise, the crystals must be kept at roughly -315°F (80 Kelvin) using liquid nitrogen.
- **Data Throughput**: Each crystal can process up to 50,000 signals per second, generating massive data streams that will eventually utilize the DELERIA pipeline for ***real-time analysis at off-site supercomputers***. 
