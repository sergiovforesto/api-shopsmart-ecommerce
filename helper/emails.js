import nodemailer from 'nodemailer'


export const emailRegister = async (data) => {
    
    const {email, name, token} = data

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const infoEmail = await transport.sendMail({
        from: 'Shopsmart - <account@shopsmart.com>',
        to: email,
        subject: "Confirm your account", // asunto
        text: "check your shopsmart account", // plain text body
        html: `
            <div
                style="padding: 20px; background-color:#FFFFFF;"
            >
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <p style="color: #444444; font-family: sans-serif; font-size:14px; margin: 5px; ; font-weight: semibold">
                        Welcome  
                        <span style="color: #1574FF; font-size: 14px">${name}!</span>
                        Thank you for registering with Shopsmart
                    </p>

                    <p
                        style="font-family: sans-serif; font-size:14px; margin: 0; color: #444444; font-weight: semibold;"
                    >
                        Your account is almost ready. Verify your account with the following link:
    
                        <a
                            style="font-size:14px; color: #1574FF; font-family: sans-serif; font-weight: normal"
                            href="${process.env.FRONTEND_URL}/confirm/${token}">Click here
                        </a>
                    </p>
    
    
                    <p style="font-size:12px; color:#FF495C; font-family: sans-serif; font-weight: semibold">
                    <span style="color: #444444;">Note:</span> 
                    If you did not create this account, please do not click on the link</p>
                </div>

            </div>
        `
    })
}



export const emailForgotPassword = async (datos) => {
    
    const {email, name, token} = datos

    //MAILTRAP, Credentials SMTP para probar tus email de forma local
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //informacion del Email
    const infoEmail = await transport.sendMail({
        from: 'Shopsmart - <account@shopsmart.com>',
        to: email,
        subject: "Reset password",
        text: "Reset your password in SmartShop",
        html: `

        <div
            style="padding: 20px; background-color:#FFFFFF;"
        >
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <p style="color: #444444; font-family: sans-serif; font-size:14px; margin: 5px; ; font-weight: semibold">
                    Hello  
                    <span style="color: #1574FF; font-size: 14px">${name}!</span>
                    In the following steps you can change your password
                </p>

                <p
                    style="font-family: sans-serif; font-size:14px; margin: 0; color: #444444; font-weight: semibold;"
                >
                    Change your password with the following link:

                    <a
                        style="font-size:14px; color: #1574FF; font-family: sans-serif; font-weight: normal"
                        href="${process.env.FRONTEND_URL}/auth/new-password/${token}">
                        Change your password here
                    </a>
                </p>


                <p style="font-size:12px; color:#FF495C; font-family: sans-serif; font-weight: semibold">
                    <span style="color: #444444;">Note:</span> 
                    If you did not create this account, please do not click on the link</p>
            </div>

        </div>
        `
    })
}