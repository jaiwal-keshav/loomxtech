// Central place for company content. Replace placeholders with real values.

export const company = {
  name: 'LoomX Technologies',
  shortName: 'LoomX',
  tagline: 'From Idea to App, We Make It Happen.',
  motto:
    "Product-minded engineering, human-centered design and scalable systems for startups and growing businesses. We'll help you move faster from prototype to production.",
  email: 'hello@loomxtech.com', // TODO: replace
  phone: '+91 00000 00000', // TODO: replace
  offices: [
    { city: 'Chhatrapati Sambhajinagar', region: 'Maharashtra, India' },
    { city: 'Pune', region: 'Maharashtra, India' },
  ],
  socials: {
    linkedin: '#',
    twitter: '#',
    github: '#',
    instagram: '#',
  },
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Why Us', to: '/why-us' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const services = [
  {
    id: 'e2e-software',
    title: 'End-to-End Software Development',
    short: 'From discovery to deployment — complete product engineering under one roof.',
    description:
      'We own the full lifecycle: product strategy, architecture, development, QA, and delivery. Scalable, maintainable systems built to grow with you.',
    icon: 'layers',
    points: ['Product strategy & architecture', 'Agile delivery teams', 'QA & continuous delivery', 'Maintainable, documented code'],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    short: 'Fast, modern, responsive web apps and sites that convert.',
    description:
      'High-performance web applications using modern stacks. SEO-friendly, accessible, and blazing fast — engineered for great UX on every device.',
    icon: 'globe',
    points: ['React / modern frontends', 'Responsive & accessible', 'Performance optimized', 'SEO-ready'],
  },
  {
    id: 'app-dev',
    title: 'App Development',
    short: 'Native-quality mobile experiences for iOS and Android.',
    description:
      'Cross-platform and native mobile apps with smooth UX, offline support, and tight backend integration — from MVP to scale.',
    icon: 'phone',
    points: ['iOS & Android', 'Cross-platform', 'Offline-first patterns', 'App store delivery'],
  },
  {
    id: 'ai',
    title: 'AI Implementation',
    short: 'Practical AI that ships — from LLMs to custom models.',
    description:
      'We integrate AI where it creates real value: intelligent automation, copilots, RAG systems, and ML pipelines tailored to your data and workflows.',
    icon: 'spark',
    points: ['LLM & RAG solutions', 'Custom ML models', 'AI copilots & assistants', 'Data pipelines'],
  },
  {
    id: 'automation',
    title: 'Automation',
    short: 'Eliminate repetitive work with smart, reliable automation.',
    description:
      'Workflow automation, CI/CD, RPA, and integrations that remove manual toil, reduce errors, and free your team to focus on what matters.',
    icon: 'bolt',
    points: ['Workflow automation', 'CI/CD pipelines', 'System integrations', 'Process optimization'],
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure Management',
    short: 'Secure, scalable, cost-optimized cloud — fully managed.',
    description:
      'Design, migration, and ongoing management of cloud infrastructure. Observability, security, autoscaling, and cost control built in.',
    icon: 'cloud',
    points: ['AWS / Azure / GCP', 'IaC & DevOps', 'Monitoring & security', 'Cost optimization'],
  },
]

export const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '6', label: 'Core Services' },
  { value: '24/7', label: 'Support & Monitoring' },
]

export const whyUs = [
  {
    title: 'Product-minded engineering',
    body: 'We think like product owners, not just coders. Every decision ties back to user value and business outcomes.',
    icon: 'target',
  },
  {
    title: 'Human-centered design',
    body: 'Interfaces people love to use. We blend research, design, and engineering for experiences that feel effortless.',
    icon: 'heart',
  },
  {
    title: 'Scalable systems',
    body: 'Architecture that holds up under growth. Built for performance, reliability, and maintainability from day one.',
    icon: 'chart',
  },
  {
    title: 'Speed to production',
    body: 'We help you move faster from prototype to production without cutting corners on quality.',
    icon: 'rocket',
  },
  {
    title: 'Transparent partnership',
    body: 'Clear communication, honest timelines, and full visibility. We work as an extension of your team.',
    icon: 'eye',
  },
  {
    title: 'End-to-end ownership',
    body: 'One partner from idea to launch and beyond — strategy, build, ship, and scale.',
    icon: 'infinity',
  },
]

export const process = [
  { step: '01', title: 'Discover', body: 'We dig into your problem, users, and goals to define what success looks like.' },
  { step: '02', title: 'Prototype', body: 'Rapid, lightweight builds to validate ideas before heavy investment.' },
  { step: '03', title: 'Engineer', body: 'Production-grade, scalable systems built with clean, observable code.' },
  { step: '04', title: 'Scale', body: 'Automation, cloud, and continuous delivery to grow with confidence.' },
]
