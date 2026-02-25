import { encryptFixedAesCbcBase64 } from '@utils/crypto.util';
import { ToolCryptoDTO } from '../dtos/tool-request.dto';
import { ToolCryptoResponseDTO } from '../dtos/tool-response.dto';

export class ToolController {
  static async crypto(params: ToolCryptoDTO): Promise<ToolCryptoResponseDTO> {
    const ciphertext = encryptFixedAesCbcBase64(params.plaintext);
    return ToolCryptoResponseDTO.generate(ciphertext);
  }
}
