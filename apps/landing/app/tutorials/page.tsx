import type { Metadata } from 'next'

import TutorialsPageClient from './tutorials-page-client'

export const metadata: Metadata = {
  title: 'Tutorials',
  description:
    "Checkout our different tutorials for building different types of user interfaces. From simple to complex, we've got you covered.",
}

// Hardcoded tutorial data
const tutorials = [
  {
    id: 1,
    title: 'Building a Todo App',
    description:
      'Learn the basics of Codelab by building a simple todo application with state management and component composition.',
    image: '/tutorials/todo-app.png',
    tags: ['Beginner', 'State Management', 'Components'],
  },
  {
    id: 2,
    title: 'E-Commerce Dashboard',
    description:
      'Create a fully functional e-commerce dashboard with product listings, cart functionality, and checkout flow.',
    image: '/tutorials/ecommerce.png',
    tags: ['Intermediate', 'Data Fetching', 'Forms'],
  },
  {
    id: 3,
    title: 'Real-time Chat Application',
    description:
      'Build a real-time chat application using WebSockets, user authentication, and message persistence.',
    image: '/tutorials/chat-app.png',
    tags: ['Advanced', 'WebSockets', 'Auth'],
  },
  {
    id: 4,
    title: 'Blog with CMS',
    description:
      'Develop a blog platform with a custom CMS, including post creation, editing, and content management.',
    image: '/tutorials/blog-cms.png',
    tags: ['Intermediate', 'CMS', 'CRUD'],
  },
  {
    id: 5,
    title: 'Data Visualization Dashboard',
    description:
      'Create interactive charts and graphs to visualize complex data sets with filtering and export capabilities.',
    image: '/tutorials/data-viz.png',
    tags: ['Advanced', 'Charts', 'Analytics'],
  },
  {
    id: 6,
    title: 'Landing Page Builder',
    description:
      'Learn how to create dynamic landing pages with drag-and-drop functionality and responsive design.',
    image: '/tutorials/landing-page.png',
    tags: ['Beginner', 'Drag & Drop', 'Responsive'],
  },
]

const TutorialsPage = async () => {
  return <TutorialsPageClient tutorials={tutorials} />
}

export default TutorialsPage
