// Schema to store all the information
// This json file is stored in ~/Documents/tbookmarker/storage/__name__.json
// Icons are in ~/Documents/tbookmarker/storage/icons/__name__.png

export interface BookmarkBookmarks {
    url: string;
    icon: string;
    title: string;
    description: string;
}

export interface BookmarkCommit {
    id: number;
    title: string;
    description: string;
    createdAt: number;
    bookmarks: BookmarkBookmarks[];
}

export interface BookmarkBranchFrom {
    commitId: number;
    branchName: string;
    createdAt: number;
}

export interface BookmarkMergedWith {
    commitId: number;
    branchName: string;
    createdAt: number;
}

export interface BookmarkBranch {
    name: string;
    description: string;
    createdAt: number;
    branchedFrom: BookmarkBranchFrom | null;
    mergedWith: BookmarkMergedWith | null;
    commits: BookmarkCommit[];
}

export interface BookmarksSchema {
    createdAt: number;
    lastModifiedAt: number;

    data: {
        branches: BookmarkBranch[]
    }
}

export interface BookmarkBlob {
    title: string;
    bookmarks: BookmarksSchema | null;
}


// bookmark_yyyymmddhhmmss.json
export const exampleSchema: BookmarksSchema = {
    createdAt: 20200921073020,
    lastModifiedAt: 20200922073020,

    data: {
        branches: [
            {
                name: "main",
                description: "master branch",
                branchedFrom: null,
                mergedWith: null,
                createdAt: 20200921073020,
                commits: [
                    {
                        id: 1,
                        title: 'Initial Commit',
                        description: 'idk',
                        createdAt: 20200921073020,
                        bookmarks: [
                            {
                                url: "https://google.com",
                                icon: "~/url/is/here",
                                title: "title_of_the_website",
                                description: "description_of_the_website"
                            },
                            {
                                url: "https://youtube.com",
                                icon: "~/url/is/here",
                                title: "title_of_the_website",
                                description: "description_of_the_website"
                            },
                        ]
                    },
                    {
                        id: 2,
                        title: 'Second Commit',
                        description: 'idk',
                        createdAt: 20200921073020,
                        bookmarks: [
                            {
                                url: "https://google.com",
                                icon: "~/url/is/here",
                                title: "title_of_the_website",
                                description: "description_of_the_website"
                            },
                            {
                                url: "https://youtube.com",
                                icon: "~/url/is/here",
                                title: "title_of_the_website",
                                description: "description_of_the_website"
                            },
                        ]
                    },
                    {
                        id: 3,
                        title: 'Third Commit',
                        description: 'idk',
                        createdAt: 20200921073020,
                        bookmarks: [
                            {
                                url: "https://google.com",
                                icon: "~/url/is/here",
                                title: "title_of_the_website",
                                description: "description_of_the_website"
                            },
                            {
                                url: "https://youtube.com",
                                icon: "~/url/is/here",
                                title: "title_of_the_website",
                                description: "description_of_the_website"
                            },
                        ]
                    }
                ]
            },
            {
                name: "dev",
                description: "dev branch",
                createdAt: 20200921073020,
                branchedFrom: {
                    branchName: "master",
                    commitId: 1,
                    createdAt: 20200921073020,
                },
                mergedWith: {
                    branchName: "master",
                    commitId: 3,
                    createdAt: 20200921073020,
                },
                commits: [
                    {
                        id: 1,
                        title: 'Initial Commit',
                        description: 'idk',
                        createdAt: 20200921073020,
                        bookmarks: [
                            {
                                url: "https://google.com",
                                icon: "~/url/is/here",
                                title: "title_of_the_website",
                                description: "description_of_the_website"
                            },
                            {
                                url: "https://youtube.com",
                                icon: "~/url/is/here",
                                title: "title_of_the_website",
                                description: "description_of_the_website"
                            },
                        ]
                    }
                ]
            },
        ]
    }
}
