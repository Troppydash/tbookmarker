import {
    BookmarkBlob,
    BookmarkBranch,
    BookmarkBranchFrom,
    BookmarkCommit,
    BookmarkGroup, BookmarkMergedWith,
    BookmarksSchema
} from './bookmarkSchemas';
import { v4 as uuidv4 } from 'uuid';
import { GetCurrentDate } from '../helpers/promiseHelpers';

/**
 * BookmarkBlob Builder class
 */
export class BookmarkBlobBuilder {
    private readonly _BookmarkBlob: BookmarkBlob;

    constructor() {
        this._BookmarkBlob = {
            title: '',
            uuid: uuidv4(),
            bookmarks: null
        };
    }

    title( title: string ): BookmarkBlobBuilder {
        this._BookmarkBlob.title = title;
        return this;
    }

    bookmarks( bookmarks: BookmarksSchema | null ): BookmarkBlobBuilder {
        this._BookmarkBlob.bookmarks = bookmarks;
        return this;
    }

    build(): BookmarkBlob {
        return this._BookmarkBlob;
    }
}

/**
 * BookmarkSchema Builder class
 */
export class BookmarkSchemaBuilder {
    private readonly _BookmarkSchema: BookmarksSchema;

    constructor() {
        this._BookmarkSchema = {
            uuid: uuidv4(),
            createdAt: GetCurrentDate(),
            lastModifiedAt: GetCurrentDate(),

            data: []
        };
    }

    createdAt( createdAt: number ): BookmarkSchemaBuilder {
        this._BookmarkSchema.createdAt = createdAt;
        return this;
    }

    data( data: BookmarkGroup[] ): BookmarkSchemaBuilder {
        this._BookmarkSchema.data = data;
        return this;
    }

    build(): BookmarksSchema {
        return this._BookmarkSchema;
    }
}

/**
 * BookmarkGroup Builder Class
 */
export class BookmarkGroupBuilder {
    private readonly _BookmarkGroup: BookmarkGroup;

    constructor() {
        this._BookmarkGroup = {
            uuid: uuidv4(),
            name: '',
            createdAt: GetCurrentDate(),
            branches: []
        };
    }

    name( name: string ): BookmarkGroupBuilder {
        this._BookmarkGroup.name = name;
        return this;
    }

    createdAt( createdAt: number ): BookmarkGroupBuilder {
        this._BookmarkGroup.createdAt = createdAt;
        return this;
    }

    description(description: string): BookmarkGroupBuilder {
        this._BookmarkGroup.description = description;
        return this;
    }

    branches(branches: BookmarkBranch[]): BookmarkGroupBuilder {
        this._BookmarkGroup.branches = branches;
        return this;
    }

    build(): BookmarkGroup {
        return this._BookmarkGroup;
    }
}

/**
 * BookmarkBranch Builder Class
 */
export class BookmarkBranchBuilder {
    private readonly _BookmarkBranch: BookmarkBranch;

    constructor() {
        this._BookmarkBranch = {
            uuid: uuidv4(),
            name: '',
            createdAt: GetCurrentDate(),
            branchedFrom: null,
            mergedWith: null,
            commits: []
        };
    }

    name( name: string ): BookmarkBranchBuilder {
        this._BookmarkBranch.name = name;
        return this;
    }

    createdAt( createdAt: number ): BookmarkBranchBuilder {
        this._BookmarkBranch.createdAt = createdAt;
        return this;
    }

    commits(commits: BookmarkCommit[]): BookmarkBranchBuilder {
        this._BookmarkBranch.commits = commits;
        return this;
    }

    branchedFrom(branchedFrom: BookmarkBranchFrom): BookmarkBranchBuilder {
        this._BookmarkBranch.branchedFrom = branchedFrom;
        return this;
    }

    mergedWith(mergedWith: BookmarkMergedWith): BookmarkBranchBuilder {
        this._BookmarkBranch.mergedWith = mergedWith;
        return this;
    }

    description(description: string): BookmarkBranchBuilder {
        this._BookmarkBranch.description = description;
        return this;
    }

    build(): BookmarkBranch {
        return this._BookmarkBranch;
    }
}

/**
 * BookmarkCommit Builder Class
 */
export class BookmarkCommitBuilder {
    private readonly _BookmarkCommit: BookmarkCommit;

    constructor() {
        this._BookmarkCommit = {
            uuid: uuidv4(),
            title: '',
            createdAt: GetCurrentDate(),
            bookmarks: []
        };
    }

    title(title: string): BookmarkCommitBuilder {
        this._BookmarkCommit.title = title;
        return this;
    }

    createdAt(createdAt: number): BookmarkCommitBuilder {
        this._BookmarkCommit.createdAt = createdAt;
        return this;
    }

    description(description: string): BookmarkCommitBuilder {
        this._BookmarkCommit.description = description;
        return this;
    }

    build(): BookmarkCommit {
        return this._BookmarkCommit;
    }
}
// TODO: Rest of builder class
