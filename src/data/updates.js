// src/data/updates.js
// Comprehensive dataset for TRS Transmissions, Lab Research, Events Timeline, and Resources

export const curatedUpdates = [
    {
        _id: "curated-1",
        title: "ROBOTIX 2026: Official Theme & Event Flagship Revealed",
        category: "Competitions",
        publishedAt: "2026-08-12T18:30:00.000Z",
        imageUrl: "/winterschool.png",
        readTime: "3 min read",
        author: "TRS Core Executive Board",
        tags: ["ROBOTIX2026", "RoboWars", "AutonomousNavigation", "IITKGP"],
        featured: true,
        summary: "The annual flagship technical fest of Technology Robotix Society returns with state-of-the-art problem statements spanning autonomous aerial drones, multi-terrain rovers, and high-octane RoboWars combat arenas.",
        body: [
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Technology Robotix Society is thrilled to officially announce ROBOTIX 2026! As eastern India's largest robotics symposium, this edition brings revolutionary challenges designed to push the boundaries of mechanical design, embedded engineering, computer vision, and swarm robotics."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Key event verticals include Autonomous Arena Navigation with dynamic obstacle avoidance, Heavyweight & Featherweight RoboWars with reinforced polycarbonate enclosures, and Autonomous Aerial Delivery systems."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Registrations will open across all Indian universities and international colleges soon. Stay tuned to the comms channel for rulebook releases and problem statement webinars."
                    }
                ]
            }
        ],
        actionLink: {
            text: "View Event Details",
            url: "#events"
        }
    },
    {
        _id: "curated-2",
        title: "KRAIG Robotics Winter School 2025: Intensive Hands-on Bootcamp",
        category: "Workshops & Talks",
        publishedAt: "2026-08-10T14:00:00.000Z",
        imageUrl: "/kraig.png",
        readTime: "4 min read",
        author: "TRS Education & Outreach Wing",
        tags: ["KRAIG", "Bootcamp", "ROS2", "Microcontrollers", "HandsOn"],
        featured: false,
        summary: "A month-long comprehensive winter bootcamp covering Embedded C, Computer Vision with OpenCV, ROS2 Robot Operating System, and 3D CAD modeling with real hardware kits.",
        body: [
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "KRAIG (Kharagpur Robotics And Intelligent Group) Winter School concluded its most successful cohort yet! Over 350 undergraduate students from various disciplines mastered the full robotics stack."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Participants built autonomous maze solvers, PID-tuned inverted pendulums, and edge-AI visual detection rovers using ESP32 microcontrollers and Raspberry Pi compute units."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "All lecture notes, code repositories, and schematic files have been open-sourced on our GitHub organization for the broader student community."
                    }
                ]
            }
        ],
        actionLink: {
            text: "Access Course Materials",
            url: "/tutorials"
        }
    },
    {
        _id: "curated-3",
        title: "Autonomous Quadruped v3: Dynamic Balancing & Gait Synthesis",
        category: "Research & Labs",
        publishedAt: "2026-08-08T11:20:00.000Z",
        imageUrl: "/bots/quadruped.jpg",
        readTime: "5 min read",
        author: "Autonomous Locomotion Lab",
        tags: ["Quadruped", "GaitPlanning", "ImpedanceControl", "BLDC"],
        featured: false,
        summary: "Successful hardware integration of custom quasi-direct drive BLDC actuators achieving robust trot and bound gaits across unstructured outdoor terrains.",
        body: [
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "The TRS Research & Hardware division has reached a breakthrough milestone in legged locomotion. Our 12-DOF Quadruped robot 'Stryker-v3' successfully demonstrated real-time active balance recovery against external lateral impulses."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Equipped with custom high-torque planetary gear actuators, high-bandwidth CAN-FD communication buses, and an onboard Jetson Orin Nano running Model Predictive Control (MPC) at 500Hz, Stryker traverses stairs, gravel, and uneven slopes seamlessly."
                    }
                ]
            }
        ],
        actionLink: {
            text: "Read Tech Specs",
            url: "#research"
        }
    },
    {
        _id: "curated-4",
        title: "Tinkering Lab & Makerspace: Hardware Infrastructure Upgrade",
        category: "Announcements",
        publishedAt: "2026-08-04T09:15:00.000Z",
        imageUrl: "/makerspace.png",
        readTime: "2 min read",
        author: "Lab Management Division",
        tags: ["Makerspace", "3DPrinting", "SMTAssembly", "Tinkering"],
        featured: false,
        summary: "Installation of next-generation CoreXY high-speed 3D printers, CNC PCB milling machines, and four-channel 200MHz digital storage oscilloscopes at the TRS Makerspace.",
        body: [
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "We are proud to announce a major equipment upgrade at the Technology Robotix Society Makerspace in the Main Building. The lab is now equipped with high-speed multi-material 3D printing stations, a multi-layer SMD reflow oven, and advanced logic analyzers."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "The makerspace is open 24/7 during project development cycles for all inducted team members and project teams."
                    }
                ]
            }
        ]
    },
    {
        _id: "curated-5",
        title: "Hexapod Spider Bot: Inverse Kinematics & Terrain Adaptation",
        category: "Research & Labs",
        publishedAt: "2026-07-28T16:45:00.000Z",
        imageUrl: "/bots/spider.jpg",
        readTime: "3 min read",
        author: "Biomimetic Robotics Lab",
        tags: ["Hexapod", "InverseKinematics", "Biomimetic", "TerrainMapping"],
        featured: false,
        summary: "18-DOF biomimetic hexapod robot with body pose stabilization, foot contact force sensing, and adaptive wave gaits for search-and-rescue exploration.",
        body: [
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "The biomimetic research group at TRS completed the evaluation of the 18-DOF Hexapod exploration platform. Utilizing an analytical inverse kinematics solver running on an STM32H7 microcontroller, the bot maintains level chassis orientation over 30-degree inclines."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Integrated ultrasonic foot sensors and an Intel RealSense D435 depth camera enable obstacle mapping and automatic foothold selection in cluttered mock-disaster zones."
                    }
                ]
            }
        ]
    },
    {
        _id: "curated-6",
        title: "Omnidirectional Mobile Robot with Lidar SLAM & Autonomous Docking",
        category: "Research & Labs",
        publishedAt: "2026-07-20T12:00:00.000Z",
        imageUrl: "/bots/omnidirectional.png",
        readTime: "4 min read",
        author: "Autonomous Navigation Subsystem",
        tags: ["Mecanum", "SLAM", "Lidar", "ROS2Navigation"],
        featured: false,
        summary: "Holonomic drive robot powered by 4 Mecanum wheels, 2D RPLIDAR A2, and Nav2 stack executing sub-centimeter waypoint navigation in warehouse environments.",
        body: [
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Our autonomous ground vehicle (AGV) division has published the performance benchmark for the four-wheel Mecanum omnidirectional research bot. With zero turning radius capability and real-time Cartographer SLAM, the robot achieves high-precision waypoint accuracy."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "An infrared beacon-assisted docking system allows the bot to autonomously align and recharge its 24V LiFePO4 battery pack."
                    }
                ]
            }
        ]
    },
    {
        _id: "curated-7",
        title: "Telepresence Rover: Low-Latency WebRTC Video & Bilateral Control",
        category: "Research & Labs",
        publishedAt: "2026-07-14T10:30:00.000Z",
        imageUrl: "/bots/telepresence.jpg",
        readTime: "3 min read",
        author: "IoT & Remote Systems Wing",
        tags: ["Telepresence", "WebRTC", "Haptics", "EdgeCompute"],
        featured: false,
        summary: "Long-range remote teleoperation rover featuring sub-80ms WebRTC dual video streaming, 2-DOF pan-tilt camera head, and haptic feedback steering.",
        body: [
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Designed for hazardous inspection and remote campus navigation, the TRS Telepresence Rover delivers an immersive first-person operator experience over 4G/5G networks."
                    }
                ]
            }
        ]
    },
    {
        _id: "curated-8",
        title: "Alumni Spotlight: Engineering Autonomous Systems in Global Tech",
        category: "Announcements",
        publishedAt: "2026-07-02T15:00:00.000Z",
        imageUrl: "/team/us.jpeg",
        readTime: "4 min read",
        author: "Alumni Relations Committee",
        tags: ["Alumni", "Mentorship", "CareerInRobotics", "IITKGP"],
        featured: false,
        summary: "A fireside conversation with TRS alumni currently leading robotics and autonomous vehicle engineering teams at Tesla, Boston Dynamics, Google DeepMind, and Waymo.",
        body: [
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "In our latest alumni series, former TRS governors and heads shared their journey from building basic line followers in the IIT Kharagpur Tinkering Lab to deploying autonomous freight trucks and surgical robotics systems."
                    }
                ]
            },
            {
                _type: "block",
                style: "normal",
                children: [
                    {
                        _type: "span",
                        text: "Key takeaway for junior students: Master fundamentals in math, state estimation, and low-level firmware while building multidisciplinary hardware prototypes."
                    }
                ]
            }
        ]
    }
];

// Upcoming Event Milestones for the "Event Horizon" Timeline
export const upcomingEvents = [
    {
        id: "evt-1",
        title: "ROBOTIX 2026 Workshop Series: ROS2 & Gazebo Simulation",
        date: "September 05, 2026",
        time: "6:00 PM - 8:30 PM IST",
        venue: "Vikramshila V2 / Online Stream",
        category: "Workshop",
        status: "Registration Open",
        description: "Hands-on session on setting up URDF models, physics simulation in Gazebo Fortress, and sensor fusion with ROS2 Humble.",
        link: "https://robotix.in/tutorials",
        badgeColor: "border-[#39b7f2] text-[#39b7f2] bg-[#39b7f2]/10"
    },
    {
        id: "evt-2",
        title: "Annual Fresher Bot Showcase & Track Competition",
        date: "September 20, 2026",
        time: "2:00 PM - 7:00 PM IST",
        venue: "Gymkhana Arena, IIT Kharagpur",
        category: "Competition",
        status: "Upcoming",
        description: "First-year inducted members showcase their newly engineered differential drive bots across obstacle mazes and hill-climb tracks.",
        link: "#",
        badgeColor: "border-[#ffbe3b] text-[#ffbe3b] bg-[#ffbe3b]/10"
    },
    {
        id: "evt-3",
        title: "Guest Lecture: Neuromorphic Vision & Event-Based Sensing",
        date: "October 10, 2026",
        time: "5:30 PM - 7:00 PM IST",
        venue: "Kalidas Auditorium",
        category: "Talk",
        status: "Scheduled",
        description: "Distinguished seminar on spike-based event cameras and high-speed motion tracking in extreme lighting conditions.",
        link: "#",
        badgeColor: "border-[#2ecc71] text-[#2ecc71] bg-[#2ecc71]/10"
    },
    {
        id: "evt-4",
        title: "ROBOTIX 2026 Grand Symposium & RoboWars National Finale",
        date: "January 23 - 25, 2027",
        time: "3-Day Flagship Fest",
        venue: "IIT Kharagpur Campus",
        category: "Flagship Fest",
        status: "Announced",
        description: "3 days of high-intensity robotics showdowns, technical symposiums, cash prizes worth 5+ Lakhs, and national robotics exhibitions.",
        link: "#",
        badgeColor: "border-[#f43f5e] text-[#f43f5e] bg-[#f43f5e]/10"
    }
];

// Active Hardware Telemetry & Research Highlights
export const researchHighlights = [
    {
        id: "res-1",
        name: "Quadruped Locomotion v3",
        subsystem: "Mechanical & Control Systems",
        progress: 88,
        status: "Hardware In-The-Loop",
        metrics: [
            { label: "Actuator Torque", value: "32 N.m Peak" },
            { label: "Control Freq", value: "500 Hz" },
            { label: "Top Speed", value: "2.4 m/s" }
        ],
        tags: ["BLDC Actuation", "MPC", "State Estimation"]
    },
    {
        id: "res-2",
        name: "Underwater Drone (AUV) Perception",
        subsystem: "Vision & Deep Learning",
        progress: 74,
        status: "Pool Trials Stage",
        metrics: [
            { label: "Turbidity Filter", value: "YOLOv9 + CLAHE" },
            { label: "Inference Latency", value: "18 ms (Edge)" },
            { label: "Depth Rating", value: "30 Meters" }
        ],
        tags: ["Underwater Vision", "Sonar Fusion", "Jetson Orin"]
    },
    {
        id: "res-3",
        name: "Swarm Bot Mesh Orchestration",
        subsystem: "Embedded & Network Protocols",
        progress: 92,
        status: "Benchmark Complete",
        metrics: [
            { label: "Nodes Connected", value: "16 Micro-Bots" },
            { label: "Mesh Latency", value: "< 4 ms" },
            { label: "Positioning Acc", value: "±2.5 cm (UWB)" }
        ],
        tags: ["ESP-NOW Mesh", "Decawave UWB", "Consensus Algorithms"]
    }
];

// Multimedia Chronicle Showcase Wall Items
export const labChronicles = [
    {
        id: "chronicle-1",
        title: "Tinkering Lab Soldering & Assembly Night",
        category: "Lab Life",
        image: "/makerspace.png",
        aspect: "aspect-4/3",
        caption: "Hardware prototyping and SMD soldering marathon before competition trials."
    },
    {
        id: "chronicle-2",
        title: "Quadruped Stryker-v3 Dynamic Trot Testing",
        category: "Field Trials",
        image: "/bots/quadruped.jpg",
        aspect: "aspect-square",
        caption: "Outdoor terrain traversal and gait tuning at the campus grounds."
    },
    {
        id: "chronicle-3",
        title: "KRAIG Winter School Hands-On Session",
        category: "Bootcamp",
        image: "/kraig.png",
        aspect: "aspect-16/9",
        caption: "Mentoring junior enthusiasts through microcontrollers and motor driver interfacing."
    },
    {
        id: "chronicle-4",
        title: "Hexapod Inverse Kinematics Chassis Calibration",
        category: "R&D",
        image: "/bots/spider.jpg",
        aspect: "aspect-square",
        caption: "Precise joint angle zero-calibration with digital servo bus feedback."
    },
    {
        id: "chronicle-5",
        title: "Mecanum Lidar SLAM Autonomous Navigation Test",
        category: "Autonomous Systems",
        image: "/bots/omnidirectional.png",
        aspect: "aspect-4/3",
        caption: "Occupancy grid mapping and obstacle avoidance in the makerspace arena."
    },
    {
        id: "chronicle-6",
        title: "Robotix Annual Team Meet & Strategy Assembly",
        category: "TRS Community",
        image: "/team/us.jpeg",
        aspect: "aspect-16/9",
        caption: "The minds and hands behind Technology Robotix Society, IIT Kharagpur."
    }
];

// Quick Access Knowledge Base & Downloads
export const quickResources = [
    {
        id: "res-1",
        title: "Beginner Robotics & Microcontroller Starter Guide",
        format: "PDF Document",
        size: "4.2 MB",
        category: "Tutorials",
        description: "Complete roadmap to AVR, STM32, motor drivers, PID tuning, and sensor interfacing.",
        link: "/tutorials"
    },
    {
        id: "res-2",
        title: "ROS2 Humble & Gazebo Quickstart Repo",
        format: "GitHub Repository",
        size: "Open Source",
        category: "Codebase",
        description: "Ready-to-clone workspace with differential drive and mecanum bot simulation packages.",
        link: "https://github.com/Technology-Robotix-Society"
    },
    {
        id: "res-3",
        title: "TRS Makerspace Safety & Fabrication Manual",
        format: "PDF Document",
        size: "2.1 MB",
        category: "Lab Standards",
        description: "Guidelines for 3D printer operation, CNC milling, battery safety, and component inventory.",
        link: "#"
    },
    {
        id: "res-4",
        title: "ROBOTIX Competition Rulebook Archive (2020-2025)",
        format: "ZIP Archive",
        size: "18.5 MB",
        category: "Archives",
        description: "Official problem statements, arena specifications, and scoring matrices from past editions.",
        link: "#"
    }
];
