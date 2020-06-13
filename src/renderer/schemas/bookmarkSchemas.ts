// Schema to store all the information
// This json file is stored in ~/Documents/tbookmarker/storage/__name__.json
// Icons are in ~/Documents/tbookmarker/storage/icons/__name__.png

// One bookmark
export interface BookmarkBookmarks {
    uuid: string;
    url: string;
    icon?: string;
    title?: string;
    description?: string;
}

// One commit
export interface BookmarkCommit {
    uuid: string;
    title: string;
    description?: string;
    createdAt: number;
    bookmarks: BookmarkBookmarks[];
}

// Sql join entity
export interface BookmarkBranchFrom {
    commitId: string;
    branchName: string;
    createdAt: number;
}

// Sql join entity
export interface BookmarkMergedWith {
    commitId: string;
    branchName: string;
    createdAt: number;
}

// One branch
export interface BookmarkBranch {
    uuid: string;
    name: string;
    description?: string;
    createdAt: number;
    branchedFrom: BookmarkBranchFrom | null;
    mergedWith: BookmarkMergedWith | null;
    commits: BookmarkCommit[];
}

// One group
export interface BookmarkGroup {
    uuid: string;
    name: string;
    description?: string;
    createdAt: number;
    branches: BookmarkBranch[];
}

// One json file
export interface BookmarksSchema {
    uuid: string;
    createdAt: number;
    lastModifiedAt: number;

    data: BookmarkGroup[];
}

// One blob
export interface BookmarkBlob {
    title: string;
    uuid: string;
    bookmarks: BookmarksSchema | null;
}


// bookmark_yyyymmddhhmmss.json
export const exampleSchema: BookmarksSchema = {
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    createdAt: 20200921073020,
    lastModifiedAt: 20200922073020,

    data: [
        {
            uuid: '9b1feb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
            name: 'Initial Group',
            createdAt: 20200921073020,
            branches: [
                {
                    uuid: '1b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                    name: 'main',
                    description: 'master branch',
                    branchedFrom: null,
                    mergedWith: null,
                    createdAt: 20200921073020,
                    commits: [
                        {
                            uuid: '9b1deb4d-3b3d-4bad-9bdd-2b0d7b3dcb6d',
                            title: 'Initial Commit',
                            description: 'idk',
                            createdAt: 20200921073020,
                            bookmarks: [
                                {
                                    uuid: '9b1de24d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                                    url: 'https://google.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                },
                                {
                                    uuid: '9b1deb4d-3b7d-4bad-3bdd-2b0d7b3dcb6d',
                                    url: 'https://youtube.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                }
                            ]
                        },
                        {
                            uuid: '9b1deb4d-sb3d-4bad-9bdd-2b0d7b3dcb6d',
                            title: 'Second Commit',
                            description: 'idk',
                            createdAt: 20200921073020,
                            bookmarks: [
                                {
                                    uuid: '9s1deb4d-3b3d-4bad-9bdd-2b0d7b3dcb6d',
                                    url: 'https://google.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                },
                                {
                                    uuid: '9b1deb4d-3b3d-4bad-9bdd-2b0d7b3dcb6s',
                                    url: 'https://youtube.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                }
                            ]
                        },
                        {
                            uuid: '9b1de24d-3b3d-4bad-9bdd-2b0d7b3dcb6d',
                            title: 'Third Commit',
                            description: 'idk',
                            createdAt: 20200921073020,
                            bookmarks: [
                                {
                                    uuid: '9b1deb4d-3b3d54bad-9bdd-2b0d7b3dcb6d',
                                    url: 'https://google.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                },
                                {
                                    uuid: '9b1deb4d-3b3d-4bad-9bdd-5b0d7b3dcb6d',
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
                    uuid: '9b1deb4d-3b3d-4bad-9bdd-5b0d7b3dc26d',
                    name: 'dev',
                    description: 'dev branch',
                    createdAt: 20200921073020,
                    branchedFrom: {
                        branchName: 'master',
                        commitId: '9b1deb4d-3b3d-4bad-9bdd-2b0d7b3dcb6d',
                        createdAt: 20200921073020
                    },
                    mergedWith: {
                        branchName: 'master',
                        commitId: '9b1de24d-3b3d-4bad-9bdd-2b0d7b3dcb6d',
                        createdAt: 20200921073020
                    },
                    commits: [
                        {
                            uuid: '9b2deb4d-3b3d-4bad-9bdd-5b0d7b3dcb6d',
                            title: 'Initial Commit',
                            description: 'idk',
                            createdAt: 20200921073020,
                            bookmarks: [
                                {
                                    uuid: '9b1deb4d-3b3d-2bad-9bdd-5b0d7b3dcb6d',
                                    url: 'https://google.com',
                                    icon: '~/url/is/here',
                                    title: 'title_of_the_website',
                                    description: 'description_of_the_website'
                                },
                                {
                                    uuid: '9b1deb4d-3b3d-4bad-97dd-5b0d7b3dcb6d',

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
