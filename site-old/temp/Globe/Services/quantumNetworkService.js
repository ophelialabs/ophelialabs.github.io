class QuantumNetworkService {
    constructor() {
        this.chattanooga = {
            name: 'Chattanooga QNet',
            lat: 35.0456,
            lng: -85.3097,
            type: 'QUANTUM_HUB',
            capabilities: {
                quantumKeyDistribution: true,
                entanglementDistribution: true,
                quantumMemory: true
            },
            connections: [
                {
                    type: 'fiber',
                    capacity: '100 quantum bits/sec',
                    range: '100km'
                },
                {
                    type: 'satellite',
                    capacity: '10 quantum bits/sec',
                    range: 'GEO orbit'
                }
            ]
        };
    }

    getNetworkState() {
        return {
            nodeStatus: 'active',
            entanglementRate: '1000 pairs/second',
            fidelity: 0.98,
            qkdRate: '100 kbps'
        };
    }

    getQuantumLinks() {
        return [
            {
                source: this.chattanooga,
                target: { lat: 35.9606, lng: -83.9207, name: 'Oak Ridge' },
                type: 'fiber',
                status: 'active'
            },
            {
                source: this.chattanooga,
                target: { lat: 33.7490, lng: -84.3880, name: 'Atlanta' },
                type: 'fiber',
                status: 'active'
            }
        ];
    }
}

/*
<div class="network-info">
        <h3>Active Nodes</h3>
        <ul class="nodes-list">
            @foreach (var node in NetworkNodes)
            {
                <li class="node-item" @onclick="() => FocusNode(node)">
                    <span class="node-name">@node.Name</span>
                    <span class="node-status">@node.Status</span>
                </li>
            }
        </ul>
    </div>
</div>

@code {
    private List<QuantumNode> NetworkNodes = new();
    private bool showLabels = true;
    private bool isRotating = false;
    const string API_KEY = "AIzaSyDK7BXtZz4ypjq0yr-7FrrAcl3oCoPpxK8";

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await LoadNetworkNodes();
            await InitializeGlobe();
        }
    }

    private async Task InitializeGlobe()
    {
        try
        {
            await JS.InvokeVoidAsync("initializeGoogleGlobe", API_KEY, NetworkNodes);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error initializing globe: {ex.Message}");
        }
    }

    private Task LoadNetworkNodes()
    {
        NetworkNodes = new List<QuantumNode>
        {
            new QuantumNode 
            { 
                Id = 1, 
                Name = "Chattanooga Hub", 
                Latitude = 35.0456, 
                Longitude = -85.2672, 
                Status = "🟢 Active",
                Capacity = 250
            },
            new QuantumNode 
            { 
                Id = 2, 
                Name = "Oak Ridge Node", 
                Latitude = 35.9181, 
                Longitude = -84.2679, 
                Status = "🟢 Active",
                Capacity = 180
            },
            new QuantumNode 
            { 
                Id = 3, 
                Name = "Atlanta Center", 
                Latitude = 33.7490, 
                Longitude = -84.3880, 
                Status = "🟢 Active",
                Capacity = 300
            },
            new QuantumNode 
            { 
                Id = 4, 
                Name = "Washington Node", 
                Latitude = 38.9072, 
                Longitude = -77.0369, 
                Status = "🟡 Connecting",
                Capacity = 120
            },
            new QuantumNode 
            { 
                Id = 5, 
                Name = "Boston Labs", 
                Latitude = 42.3601, 
                Longitude = -71.0589, 
                Status = "🟢 Active",
                Capacity = 220
            }
        };
        return Task.CompletedTask;
    }
*/
