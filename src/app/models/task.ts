export interface ITask {
    id: string;
    done: boolean;
    description: string;
}

export class Task {
    id: string;
    description: string;
    done: boolean;

    constructor(description) {
        this.id = new Date().getTime().toString();
        this.done = false;
        this.description = description;
    }
}
