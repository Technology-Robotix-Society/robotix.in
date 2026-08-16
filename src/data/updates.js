// src/data/updates.js
// Comprehensive dataset for TRS Transmissions, Lab Research, Events Timeline, and Resources

export const curatedUpdates = [];

// Upcoming Event Milestones for the "Event Horizon" Timeline
export const upcomingEvents = [];

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
