import { writable } from 'svelte/store';

export const chartLayers = writable({ days: true, weeks: true });
