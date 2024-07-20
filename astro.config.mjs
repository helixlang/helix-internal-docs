import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import axios from 'axios';

async function fetchGrammar() {
    const url = 'https://raw.githubusercontent.com/kneorain/helix-highlighter/main/syntaxes/helix.tmLanguage.json';
    const response = await axios.get(url);
    return response.data;
}

const grammar = await fetchGrammar();

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Helix',

            logo: {
                src: "/public/favicon.svg",
                replacesTitle: false,
            },
            editLink: {
                baseUrl: 'https://github.com/kneorain/helix-api-docs/edit/main/src/content/docs',
            },
            social: {
                github: 'https://github.com/kneorain/helix',
            },
            customCss: ["/src/styles/docstyle.css"],
            expressiveCode: {
                themes: ['one-dark-pro', 'one-light'],
                shiki: {
                    langs: [
                        grammar
                    ],
                },
                styleOverrides: { borderRadius: '0.2rem' },
            },
			sidebar: [
				{
					label: 'Internal Reference',
					badge: 'New',
					autogenerate: { directory: 'internal' },
				},
				{
					label: 'Toolchain API',
					badge: 'Wip',
					autogenerate: { directory: 'toolchain' },
				},
			],
		}),
	],
});


