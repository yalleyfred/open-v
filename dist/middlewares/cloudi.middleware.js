"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const courseMiddleware = async (req, res, next) => {
    try {
        if (!req.file) {
            console.log("No file received");
            //  res.send({
            //   success: false
            // });
        }
        else {
            console.log('file received');
            //  res.send({
            //   success: true
            // })
        }
        const result = await cloudniary.uploader.upload(req.file.path, {
            folder: "image",
            resource_type: "image"
        });
    }
    catch (error) {
    }
};
//# sourceMappingURL=cloudi.middleware.js.map