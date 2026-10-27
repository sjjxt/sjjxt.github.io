export type ProfileConfig = {
	avatar?: string;
	aboutUrl?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
		showName?: boolean;
	}[];
};
