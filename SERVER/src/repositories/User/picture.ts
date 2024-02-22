import { IPictureRepository, PictureParams } from "../../controllers/User/protocols";
import { Message } from "../../controllers/protocols";
import { AddImage, UpdateImage } from "../../services/aws";
import prisma from "../../services/prisma";

export default class PictureRepository implements IPictureRepository{
    async change(params: PictureParams): Promise<void | Message> {
        const {email, fileObject, url_image} = params;
        try {
            const user = await prisma.user.findUnique({where: {email}});
            if (!user) {
                return {
                    message: "Usuário não encontrado"
                }
            }
            let picture: string;

            if (user.picture == "https://icones.pro/wp-content/uploads/2021/02/icono-de-camara-gris.png") {
                picture = await AddImage(fileObject);
            } else {
                picture = await UpdateImage(fileObject, user.picture);
            }
            
            await prisma.user.update({
                where:{email},
                data:{
                    picture
                }
            });
        } catch (error) {
            return error;
        }
    }
}