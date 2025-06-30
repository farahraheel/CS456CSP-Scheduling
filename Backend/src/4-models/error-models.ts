export class ErrorModel {
    public constructor(public message: string, public status: number) { }
}

export class RouteNotFoundErrorModel extends ErrorModel {
    public constructor(route: string) {
        super(`Route ${route} not exist`, 404);
    }
}

export class ResourceNotFoundErrorModel extends ErrorModel {
    public constructor(id: number) {
        super(`id ${id} not exist`, 404);
    }
}

export class ValidationErrorModel extends ErrorModel {
    public constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedErrorModel extends ErrorModel {
    public constructor(message: string) {
        super(message, 401);
    }
}

// إضافة تعارض المواعيد مع اقتراح بديل
export class ConflictErrorModel extends ErrorModel {
    public suggestion: any;

    public constructor(suggestion: any) {
        super("Meeting time conflict", 409);
        this.suggestion = suggestion;
    }
}
