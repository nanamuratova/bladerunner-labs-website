export type Project = {
  id: string
  name: string
  category: string
  image: string
  description: string
  tags: string[]
  overview: string[]
  capabilities: { title: string; body: string }[]
}

export const projects: Project[] = [
  {
    id: 'dagrunner',
    name: 'DAGRunner',
    category: 'AI / ML infrastructure',
    image: '/assets/product-2.png',
    description:
      'An orchestration platform for multi-stage AI inference. DAGRunner coordinates processing, parallel execution and GPU batching to keep workloads moving as soon as their data is ready.',
    tags: ['Orchestration', 'Parallel execution', 'GPU batching'],
    overview: [
      'DAGRunner models multi-stage inference as a directed acyclic graph, scheduling each stage the moment its inputs are available rather than waiting for an entire pipeline to complete.',
      'The platform coordinates CPU pre-processing, GPU inference and post-processing across a shared pool of accelerators, batching compatible requests to raise utilization without hand-tuned pipelines.',
    ],
    capabilities: [
      { title: 'Data-driven scheduling', body: 'Stages run as soon as their dependencies resolve, reducing idle time between steps.' },
      { title: 'Parallel execution', body: 'Independent branches of the graph execute concurrently across available compute.' },
      { title: 'GPU batching', body: 'Compatible requests are grouped dynamically to improve accelerator throughput.' },
      { title: 'Backpressure aware', body: 'Queues adapt to downstream capacity so fast stages do not overwhelm slower ones.' },
    ],
  },
  {
    id: 'ai-couture',
    name: 'AI Couture',
    category: 'Applied AI / Computer vision',
    image: '/assets/product-1.png',
    description:
      'Virtual fitting technology combining body measurement, 3D and generative AI. AI Couture is being developed to help shoppers understand how clothing fits their own body.',
    tags: ['Body measurement', '3D simulation', 'Virtual fitting'],
    overview: [
      'AI Couture estimates body measurements from ordinary photographs and reconstructs a personalized 3D body model, avoiding specialized capture hardware.',
      'Garments are simulated against that model so shoppers can see how a specific size drapes and fits on their own proportions before buying.',
    ],
    capabilities: [
      { title: 'Body measurement', body: 'Measurements are derived from standard photos with computer vision models.' },
      { title: '3D reconstruction', body: 'A personalized body model provides the basis for accurate fit prediction.' },
      { title: 'Generative fit preview', body: 'Generative models render how garments look and drape on the individual.' },
      { title: 'Size guidance', body: 'Fit results translate into concrete, per-garment size recommendations.' },
    ],
  },
]

export const services = [
  {
    title: 'Research & system architecture',
    body: 'Investigate technical options, test feasibility and design modular systems. Turn open questions into a practical engineering direction.',
  },
  {
    title: 'Software & infrastructure',
    body: 'Build and extend software across distributed systems, storage, networking, Kubernetes and AI/ML infrastructure.',
  },
  {
    title: 'Performance & optimization',
    body: 'Find bottlenecks across compute, data and I/O. Improve throughput and resource use with measurements that guide the trade-offs.',
  },
  {
    title: 'Developer tools & workflows',
    body: 'Make complex development environments easier to work with: build systems, container workflows, continuous integration and multi-repository tooling.',
  },
]

export const technology = [
  {
    group: 'AI & computation',
    items: ['AI inference pipelines', 'Computer vision', 'GPU workload coordination', 'Parallel processing'],
  },
  {
    group: 'Systems & infrastructure',
    items: ['Linux & kernel development', 'Kubernetes & CSI drivers', 'Ceph · NVMe · RDMA', 'Distributed storage'],
  },
  {
    group: 'Engineering tools',
    items: ['Docker & mkdocker', 'CMake & BuildRunner', 'Git & CI workflows', 'Multi-repository builds'],
  },
]
