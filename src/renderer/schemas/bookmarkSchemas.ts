// Schema to store all the information
// This json file is stored in ~/Documents/tbookmarker/storage/__name__.json
// Icons are in ~/Documents/tbookmarker/storage/icons/__name__.png

// One bookmark
export interface BookmarkBookmarks {
    url: string;
    icon?: string;
    title?: string;
    description?: string;
}

// One commit
export interface BookmarkCommit {
    id: number;
    title: string;
    description?: string;
    createdAt: number;
    bookmarks: BookmarkBookmarks[];
}

// Sql join entity
export interface BookmarkBranchFrom {
    commitId: number;
    branchName: string;
    createdAt: number;
}

// Sql join entity
export interface BookmarkMergedWith {
    commitId: number;
    branchName: string;
    createdAt: number;
}

// One branch
export interface BookmarkBranch {
    name: string;
    description?: string;
    createdAt: number;
    branchedFrom: BookmarkBranchFrom | null;
    mergedWith: BookmarkMergedWith | null;
    commits: BookmarkCommit[];
}

// One group
export interface BookmarkGroup {
    name: string;
    description?: string;
    createdAt: number;
    branches: BookmarkBranch[];
}

// One json file
export interface BookmarksSchema {
    createdAt: number;
    lastModifiedAt: number;

    data: BookmarkGroup[];
}

// One blob
export interface BookmarkBlob {
    title: string;
    bookmarks: BookmarksSchema | null;
}


// bookmark_yyyymmddhhmmss.json
export const exampleSchema: BookmarksSchema = {
    createdAt: 20200921073020,
    lastModifiedAt: 20200922073020,

    data: [
        {
            name: 'Initial Group',
            createdAt: 20200921073020,
            branches: [
                {
                    name: 'main',
                    description: 'master branch',
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
                                    url: 'https://google.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                },
                                {
                                    url: 'https://youtube.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: 'Second Commit',
                            description: 'idk',
                            createdAt: 20200921073020,
                            bookmarks: [
                                {
                                    url: 'https://google.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                },
                                {
                                    url: 'https://youtube.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                }
                            ]
                        },
                        {
                            id: 3,
                            title: 'Third Commit',
                            description: 'idk',
                            createdAt: 20200921073020,
                            bookmarks: [
                                {
                                    url: 'https://google.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                },
                                {
                                    url: 'https://youtube.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'dev',
                    description: 'dev branch',
                    createdAt: 20200921073020,
                    branchedFrom: {
                        branchName: 'master',
                        commitId: 1,
                        createdAt: 20200921073020
                    },
                    mergedWith: {
                        branchName: 'master',
                        commitId: 3,
                        createdAt: 20200921073020
                    },
                    commits: [
                        {
                            id: 1,
                            title: 'Initial Commit',
                            description: 'idk',
                            createdAt: 20200921073020,
                            bookmarks: [
                                {
                                    url: 'https://google.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                },
                                {
                                    url: 'https://youtube.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
