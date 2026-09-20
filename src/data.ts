export type Project = {
  id: string
  name: string
  category: string
  /** Card image, also the article hero unless heroImage overrides it. */
  image: string
  /** Article hero, when it should differ from the card image. */
  heroImage?: string
  /** How the article hero sits in its frame — diagrams want 'contain'. */
  heroFit?: 'cover' | 'contain'
  description: string
  tags: string[]
  overview: string[]
  capabilities: { title: string; body: string }[]
  /** Longer article sections, rendered under the capabilities. */
  sections?: {
    heading: string
    paragraphs?: string[]
    bullets?: string[]
    /** Figures shown as boxes. */
    stats?: { value: string; label: string }[]
    /** Where the figures came from, or what they do and don't claim. */
    note?: string
  }[]
  /** What is ready, what is still moving. */
  status?: { state: string; items: string[] }[]
}

export const projects: Project[] = [
  {
    id: 'dagrunner',
    name: 'DAGRunner',
    category: 'AI / ML infrastructure',
    image: '/assets/product-2.png',
    heroImage: '/assets/dagrunner-pipeline.webp',
    heroFit: 'contain',
    description:
      'An orchestration platform for multi-stage AI inference. DAGRunner coordinates processing, parallel execution and GPU batching to keep workloads moving as soon as their data is ready.',
    tags: ['Orchestration', 'Parallel execution', 'GPU batching'],
    overview: [
      'DAGRunner orchestrates multi-stage AI workloads as streams of work moving through long-lived processing services. Each work unit advances as soon as its inputs are ready, while parallelism across services — and batching and concurrency inside them — keeps compute busy.',
      'The result is a workload layer that can start locally and extend to distributed execution without changing the application flow.',
    ],
    capabilities: [
      { title: 'Data-driven scheduling', body: 'Stages run as soon as their dependencies resolve, reducing idle time between steps.' },
      { title: 'Parallel execution', body: 'Independent branches of the graph execute concurrently across available compute.' },
      { title: 'GPU batching', body: 'Compatible requests are grouped dynamically to improve accelerator throughput.' },
      { title: 'Backpressure aware', body: 'Queues adapt to downstream capacity so fast stages do not overwhelm slower ones.' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'In a multi-stage AI pipeline, most of the elapsed time is often spent waiting rather than computing. Stages run one after another because that is how the pipeline was written, independent work is parallelized later than it could be, and accelerators sit idle while CPU pre-processing or I/O catches up.',
          'The waiting compounds. Every stage boundary adds a pause, and across a long pipeline those pauses add up to longer runtimes and a higher cost for each completed job.',
        ],
      },
      {
        heading: 'How it works',
        paragraphs: [
          'DAGRunner describes a workload as connected processing stages with data dependencies between them, then moves each unit of work forward the moment its own inputs are ready — rather than waiting for the stage ahead of it to finish in full. Independent work runs in parallel, and GPU work is batched where batching helps.',
          'Intermediate data stays in files. The orchestrating server routes path references instead of carrying payloads, and a native lightweight shared filesystem extends those paths across nodes while keeping local storage as the fast path — avoiding the locking and metadata synchronization overhead of an NFS-style mount.',
          'Orchestration state is persisted, so central control can recover and migrate. A workload can start on one machine and extend to distributed execution without rewriting the application flow.',
        ],
      },
      {
        heading: 'Where it fits',
        paragraphs: [
          'DAGRunner owns the flow of a workload, not the layers beneath it. Models and processing tasks can run locally in containers, or be called through model servers such as Triton and external APIs. Resources can be managed by DAGRunner itself or by Kubernetes, KAI / Run:ai, or a cloud scheduler.',
          'It suits jobs made of many related work units that can often proceed independently:',
        ],
        bullets: [
          'Video frames',
          'Images and image regions',
          '3D models and mesh parts',
          'Large files split into processing units',
          'Multi-page documents',
        ],
      },
      {
        heading: 'Measured results',
        stats: [
          { value: '20 \u2192 2 min', label: 'End-to-end runtime' },
          { value: '15% \u2192 95%', label: 'GPU utilization' },
        ],
        note: 'Measured on one real virtual try-on pipeline \u2014 an internal benchmark run under favorable conditions. Results on other workloads will differ.',
      },
    ],
    status: [
      {
        state: 'Ready',
        items: [
          'Distributed orchestration',
          'Batch-streaming execution',
          'Native shared filesystem',
        ],
      },
      { state: 'Evolving', items: ['Private and enterprise deployment'] },
      {
        state: 'In progress',
        items: ['Kubernetes-native operation', 'Tools to adapt existing AI workloads'],
      },
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
      'AI Couture is a virtual fitting platform built around practical fit accuracy. It replaces guesswork with a physics-based fitting room: shoppers see themselves in a virtual mirror wearing digital garment patterns at a specific size, before they buy.',
      'The fit is computed, not illustrated. Garment tension, weight and drape are simulated against a digital twin of the shopper\u2019s own body, so a size that will not work looks wrong on screen rather than at home.',
    ],
    capabilities: [
      { title: 'Body measurement', body: 'Measurements are derived from standard photos with computer vision models.' },
      { title: '3D reconstruction', body: 'A personalized body model provides the basis for accurate fit prediction.' },
      { title: 'Generative fit preview', body: 'Generative models render how garments look and drape on the individual.' },
      { title: 'Size guidance', body: 'Fit results translate into concrete, per-garment size recommendations.' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'Online fashion carries a margin drain that in-store retail does not. Between a quarter and a third of what sells online comes back, against 8.5\u201310% in store, and over half of those returns trace directly to sizing uncertainty.',
          'Shoppers have adapted to that uncertainty by ordering several sizes and returning the rest, which inflates logistics costs, slows inventory turnover and makes returns a routine part of the purchase cycle rather than an exception.',
        ],
        stats: [
          { value: '25\u201330%', label: 'Of online fashion sales returned, against 8.5\u201310% in store' },
          { value: '$849.9 bn', label: 'Returned annually \u2014 15.8% of retail sales' },
          { value: '$15\u201330', label: 'Lost processing each return' },
          { value: '63%', label: 'Of shoppers order several sizes to try at home' },
        ],
        note: 'Figures as cited in the AI Couture deck, from the National Retail Federation, Appriss Retail, Signifyd Intelligence, Happy Returns, the Narvar Consumer Study and the Optoro Reverse Logistics Report.',
      },
      {
        heading: 'Why existing try-ons fall short',
        paragraphs: [
          'Most virtual try-ons superimpose a shopper\u2019s face onto flat templates or generic game-style avatars. They can look convincing and still tell the shopper nothing about fit, because nothing in them is computed from physics.',
        ],
        bullets: [
          'Accuracy \u2014 competitor try-ons are not physics-based, so what they show is an illustration rather than a measurement',
          'Drape \u2014 garment fit, drape and movement are not assessed, even when the render looks realistic',
          'Trust \u2014 shoppers learn to order more and return most, and the return rate holds',
        ],
      },
      {
        heading: 'A digital twin, not an avatar',
        paragraphs: [
          'AI Couture builds a dynamic, data-driven digital twin of the shopper\u2019s actual body rather than a visual skin. Physics-based fabric simulation then responds to that twin\u2019s exact geometry, accounting for drape, tension and weight derived from real body measurements.',
          'Capture is deliberately light. Using a smartphone and a proprietary T-shirt with passive sensors, the shopper completes a 360\u00b0 scan in a dedicated app, which the platform turns into a high-precision fitting session and an AI-generated fitting video.',
        ],
        note: 'The capture method is claimed under patent US 11,113,892 B2, \u201c3D-Based Clothing and Accessory Retail Method\u201d.',
      },
      {
        heading: 'Built on DAGRunner',
        paragraphs: [
          'The simulations run on DAGRunner, the orchestration platform built by the same team. Containerized service pipelines, multi-processing and GPU auto-batching give the multi-level parallelism that physics-based garment simulation needs to run at scale rather than one job at a time.',
        ],
      },
      {
        heading: 'What retailers gain',
        paragraphs: [
          'The case to a fashion brand rests on four outcomes:',
        ],
        bullets: [
          'Accurate biometrics \u2014 precise measurements, and a better fit',
          'A better fitting experience for the end user',
          'Fewer returns, and the profitability that follows',
          'Enhanced trust, and customers who come back',
        ],
        note: 'Outcomes the platform is designed to produce. The deck reports no retailer results yet, so these are expectations rather than measured gains.',
      },
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
