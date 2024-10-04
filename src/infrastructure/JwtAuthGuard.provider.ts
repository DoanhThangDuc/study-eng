import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("canActivate is running", super.canActivate(context));

    const request = context.switchToHttp().getRequest();
    console.log("Authorization Header:", request.headers.authorization);
    return super.canActivate(context);
  }
}
