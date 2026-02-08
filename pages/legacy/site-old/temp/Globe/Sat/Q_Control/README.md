# Q_Control (Quantum Control)

The Optical Quantum Ground Station (OQGS) for Canada’s Quantum EncrYption and Science Satellite (QEYSSat) mission is a specialized facility designed to demonstrate ground-to-space Quantum Key Distribution (QKD). Developed primarily by Honeywell Aerospace and the Institute for Quantum Computing (IQC) at the University of Waterloo, the station acts as the transmitter in the quantum link, sending encoded photons to the satellite in Low Earth Orbit (LEO). 
Core Infrastructure and Hardware
The OQGS utilizes advanced optical systems to maintain precise alignment with the satellite moving at high speeds. According to SpaceOps-2025, the station's construction includes: 
Telescope and Mount: A 43 cm aperture telescope equipped with a beacon emitter for automated tracking.
Quantum Sources: Integrated systems for generating an Entangled Photon Source (EPS) and Weak Coherent Pulse (WCP) transmissions.
Protective Dome: A specialized structure designed to open/close for operations and automatically shut down during rapid weather changes to protect sensitive optics.
Back-end Assembly: Includes pointing, tracking, and polarization control to ensure the quantum state of the photons remains intact during atmospheric transit. 
Locations and Deployment
The mission incorporates a primary station and several collaborative sites to ensure operational flexibility, especially if local weather conditions are poor. 
Primary OQGS: To be located at the Canadian Space Agency (CSA) headquarters in St-Hubert (Longueuil), Quebec, with deployment completion targeted for late 2025.
Science Operation Centre (SOC): Managed by the University of Waterloo (IQC), which also hosts its own quantum ground station for research and mission support.
Transportable Option: Honeywell has also developed a Transportable Optical Ground Station (TOGS) designed to be compatible with QEYSSat, featuring a larger 61 cm receiver and ruggedized for Canadian winters. 
Key Mission Functions
Uplink Demonstration: Unlike many other missions, QEYSSat focuses on a ground-to-space uplink, where the ground station generates the quantum signal and the satellite acts as the receiver.
Hybrid Communication: The OQGS is designed to demonstrate full-duplex classical optical communication alongside its quantum functions.
Night-time Operations: To prevent stray light from interfering with sensitive single-photon detection, most quantum experiments must take place during eclipse periods at night.
Data Analysis: The station records polarization states, timestamps, and error rates for post-pass scientific analysis. 

The hardware for the QEYSSat Optical Quantum Ground Station (OQGS) is a sophisticated blend of high-precision astronomical equipment and cutting-edge quantum optics. Because the mission utilizes an uplink (sending photons from the ground to a satellite), the hardware must compensate for atmospheric turbulence before the signal even leaves the Earth's orbit.
Here is a breakdown of the specific hardware components integrated into the station:
1. The Optical Assembly (Telescope & Tracking)
The "front end" of the OQGS is responsible for finding the satellite and maintaining a stable link.
The Telescope: A 43 cm (17-inch) PlaneWave CDK17 corrected Dall-Kirkham telescope. It is chosen for its flat field and lack of coma, which is essential for maintaining photon polarization.
The Mount: A direct-drive equatorial mount (often the PlaneWave L-500). Unlike gear-driven mounts, direct-drive systems allow for high-speed, vibration-free tracking required to follow a satellite moving at ~7.5 km/s in Low Earth Orbit (LEO).
Beacon Laser: A high-power 808 nm (near-infrared) laser used as a "handshake" signal. The satellite looks for this beacon to orient itself, while the ground station uses the satellite’s beacon to perform closed-loop tracking.
2. The Quantum Source System
Located in the "Coudé room" or a temperature-controlled laboratory beneath the telescope, this hardware generates the actual quantum states.
Weak Coherent Pulse (WCP) Source: Uses high-speed Vertical-Cavity Surface-Emitting Lasers (VCSELs) or diode lasers at 785 nm. These are attenuated to the single-photon level using neutral density filters to simulate a quantum signal.
Entangled Photon Source (EPS): Uses Spontaneous Parametric Down-Conversion (SPDC). A pump laser hits a non-linear crystal (like periodically poled potassium titanyl phosphate, or ppKTP) to create a pair of entangled photons. One is measured locally; the other is sent to the telescope.
Quantum Pulse Position Modulation (QPPM): Specialized electronics that timing-encode the pulses with sub-nanosecond precision.
3. Polarization and Timing Control
Since the quantum information is encoded in the polarization of the photons (e.g., horizontal, vertical, diagonal), the hardware must "undo" any changes caused by the atmosphere or the telescope's mirrors.
Liquid Crystal Variable Retarders (LCVRs): These are used for high-speed, non-mechanical polarization compensation. They adjust the phase of the light in real-time to ensure the satellite receives the correct "state."
GPS-Disciplined Rubidium Clocks: Essential for time-tagging. Both the ground station and the satellite must be synchronized within nanoseconds to ensure that the photon detected by the satellite is the exact same one sent by the ground station.
4. Atmospheric and Support Systems
Hatch/Dome Automation: The station is housed in a clamshell dome that is integrated with a weather station. If sensors detect high humidity, precipitation, or high winds, the dome closes automatically to protect the optics.
Classical Optical Link: A separate transceiver for 1550 nm (standard telecom wavelength) communication. This is used for the "public" part of the QKD protocol, such as error correction and privacy amplification.
Hardware Summary Table
Component	Specification / Model	Purpose
Telescope	43 cm PlaneWave CDK	Photon transmission & tracking
Quantum Wavelength	~785 nm	Optimal for Si-based detectors on satellite
Beacon Wavelength	808 nm	Tracking and pointing handshake
Clock Precision	Rubidium Standard	Nanosecond event synchronization
Correction Hardware	LCVRs	Real-time polarization alignment

Polarization compensation and software management are the critical "brains" of the QEYSSat mission, ensuring that quantum information remains readable despite atmospheric distortion and satellite movement.
1. Polarization Compensation Mechanism
Because QEYSSat primarily uses an uplink (ground-to-satellite), the ground station must "pre-compensate" the photons so they arrive at the satellite in the correct orientation. 
Dynamic Reference Frame Alignment: As the satellite moves across the sky, its relative orientation to the ground station changes. To correct this, the OQGS uses Liquid Crystal Variable Retarders (LCVRs)—non-mechanical cells that change their optical properties when a specific voltage is applied.
The Beacon Handshake: The satellite and ground station exchange linearly polarized beacon lasers (808 nm). By measuring the polarization of the incoming satellite beacon, the OQGS calculates the exact rotation and ellipticity shifts currently affecting the link.
Real-Time Correction Loop: The system feeds these calculations into a control algorithm that adjusts the LCVRs in real-time. This maintains a high Polarization Extinction Ratio (PER), typically targeting a fidelity of over 99.5%, which is necessary to keep the Quantum Bit Error Rate (QBER) low enough for key generation. 
2. Software Protocols and Key Exchange
The QEYSSat mission utilizes the BB84 protocol (for weak coherent pulses) and the BBM92 protocol (for entangled photons) to manage the key exchange. 
Post-Processing Protocol Layers:
Sifting: After a satellite pass, the ground station and satellite compare their measurement bases (but not the actual bit values) over a classical channel. Bits where the bases did not match are discarded.
Error Correction: Algorithms identify and fix discrepancies caused by atmospheric noise or equipment jitter.
Photon "Jitter": Modern researchers associated with Searl's lineage have studied quantum-limited timing jitter in fiber lasers, which involves observing the noise performance and stability of single-photon pulses.
Privacy Amplification: This final step shrinks the final key to ensure that even if an eavesdropper intercepted some information, they have zero usable knowledge of the final resulting key.
Key Management System (KMS): The mission is designed to integrate with Honeywell’s EvolutionQ key management software. This software handles the storage and distribution of the completed keys to end-users once the "raw" quantum data has been fully processed into a secure symmetric key.
Trusted Node Configuration: Since the satellite acts as a receiver for multiple ground stations (e.g., St-Hubert and Waterloo), it can act as a trusted node. It generates a Boolean combination (XOR) of two different keys from two locations and broadcasts the result, allowing the two ground stations to establish a shared key without the satellite ever permanently storing the full final secret. 

