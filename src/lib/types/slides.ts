export interface Slide {
	id: string;
	title: string;
	content: string;
	image?: string;
	type?: string;
}

export interface Presentation {
	id: string;
	title: string;
	slides: Slide[];
}

export const samplePresentation: Presentation = {
	id: 'demo-presentation',
	title: 'Sample Presentation',
	slides: [
		{
			id: '1',
			title: 'Welcome to Our Presentation',
			content: `# Getting Started

This is a simple slides system built with **SvelteKit** and **Mimsy CMS**.

Features:
- Clean, minimal design
- Keyboard navigation
- Responsive layout
- Markdown support`
		},
		{
			id: '2',
			title: 'Key Features',
			content: `## What We Offer

- **Easy Navigation**: Use arrow keys or buttons to navigate
- **Markdown Support**: Write content in markdown format
- **Responsive Design**: Works on all screen sizes
- **Image Support**: Add optional images to any slide

> This system is perfect for presentations, documentation, and more.`
		},
		{
			id: '3',
			title: 'Visual Content',
			content: `## Images and Media

You can easily add images to your slides to make them more engaging and informative.

Images are optional and will be displayed prominently when included.`,
			image: 'https://placehold.co/800x400/4F46E5/ffffff?text=Sample+Image'
		},
		{
			id: '4',
			title: 'Code Examples',
			content: `## Code Support

You can include code examples in your slides:

\`\`\`typescript
interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string;
}
\`\`\`

Perfect for technical presentations!`
		},
		{
			id: '5',
			title: 'Thank You!',
			content: `## Questions?

Thank you for watching this presentation.

### Navigation Tips:
- Use **← →** arrow keys to navigate
- **Spacebar** for next slide
- Click the navigation buttons

Built with ❤️ using SvelteKit and Mimsy CMS.`
		}
	]
};
