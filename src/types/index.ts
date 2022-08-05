export interface File {
	id: string;
	name: string;
	createdAt: number;
	content: string;
	folderId: string;
	tags: string[];
}

export interface Folder {
	id: string;
	name: string;
	files: File[];
}
