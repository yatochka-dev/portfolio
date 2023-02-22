import type {Record} from 'pocketbase'

enum PostState {
    DRAFT = 'draft',
    PUBLISHED = 'published',
}

export enum SkillCategory {
    LANGUAGES = 'Languages',
    FRAMEWORKS = 'Frameworks',
    LIBRARIES = 'Libraries',
    DATABASES = 'Databases',
    TOOLS = 'Tools',
}

export type ID = string;

export interface Auth extends Record {
    username: string;
    email: string;
    emailVisibility: boolean;
    verified: boolean;
}

export interface User extends Auth {
    readonly name: string;
    readonly avatar: string;
}

export interface Comment extends Record {
    content: string;
    post: ID;
    author: ID;
    expand: {
        author?: User,
        post?: Post,
    }
}

export interface Post extends Record {
    readonly title: string;
    readonly content: string;
    readonly picture: string;
    readonly state: PostState;
    readonly comments: ID[];
    readonly author: ID;
    readonly expand: {
        author?: User,
        comments?: Comment[],
    }
}

export interface Skill extends Record {
    readonly name: string,
    readonly category: SkillCategory,
    readonly description: string,
    readonly link_to_source: string,
    readonly image: string,
    readonly knowledge_level: number,
}


export interface Project extends Record {
    readonly name: string,
    readonly picture: string,
}