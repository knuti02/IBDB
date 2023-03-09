import { Author } from "./Author";

export type Book = {
    title: string;
    titleLowerCase: string;
    author: Author;
    description: string;
    publishDate: Date;
    isbn_10: string;
    isbn_13: string;
    coverURL: string;
    series?: [string];
    numberOfPages: number;
    subjects: [string];
}