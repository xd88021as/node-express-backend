import { UserService } from '@modules/user/services/user.service';
import { RoleService } from '@modules/role/services/role.service';
import { AuthSignInDTO, AuthSignUpDTO } from '../dtos/auth-request.dto';
import { AuthResponseDTO } from '../dtos/auth-response.dto';
import { checkForbidden, checkNotFound } from '@utils/http-error.util';
import { verifyPassword } from '@utils/crypto.util';
import { signJwt } from '@utils/jwt.util';
import { UserStatusService } from '@modules/user-status/services/user-status.service';

export class AuthController {
  static async signIn(params: AuthSignInDTO): Promise<AuthResponseDTO> {
    const user = await UserService.findUnique({ account: params.account });
    checkNotFound(user, 'User not found');
    const verify = verifyPassword(params.password, user.password);
    checkForbidden(verify, 'Wrong password');
    const token = signJwt({ userUuid: user.uuid, roleName: user.role.name });
    return AuthResponseDTO.generate({
      userUuid: user.uuid,
      balance: user.balance,
      currency: user.currency,
      language: user.language,
      token,
    });
  }

  static async signUp(params: AuthSignUpDTO): Promise<AuthResponseDTO> {
    const status = await UserStatusService.findUnique('active');
    checkNotFound(status, 'User status not found');
    const role = await RoleService.findUnique('user');
    checkNotFound(role, 'Role not found');
    const user = await UserService.create({
      account: params.account,
      password: params.password,
      currency: params.currency,
      language: params.language,
      statusId: status.id,
      roleId: role.id,
    });
    const token = signJwt({ userUuid: user!.uuid, roleName: user!.role.name });
    return AuthResponseDTO.generate({
      userUuid: user!.uuid,
      balance: user!.balance,
      currency: user!.currency,
      language: user!.language,
      token,
    });
  }
}
