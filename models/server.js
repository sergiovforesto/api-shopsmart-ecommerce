import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import db from '../db/connectDB.js'
import User from '../routes/userRoutes.js'
import Product from '../routes/productRoutes.js'
import Features from '../routes/featuresRoutes.js'
import Collection from '../routes/collectionsRoutes.js'
import ShippingInfo from '../routes/shippingInfoRoutes.js'
import Orders from '../routes/orderRoutes.js'
import Payment from '../routes/paymentsRoutes.js'
import ImageProduct from '../routes/uploadRoute.js'

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 5000

        this.path = {
            users: '/api/v1/users',
            products: '/api/v1/products',
            features: '/api/v1/features',
            collections: '/api/v1/collections',
            shippingInfo: '/api/v1/shipping-info',
            orders: '/api/v1/orders',
            payments: '/api/v1/payments',
            uploads: '/api/v1/uploads'
        }

        this.whitelist = [process.env.FRONTEND_URL]
        
        this.connectDB()

        this.middlewares()

        this.routes()
    }


    async connectDB() {
        try {
            await db.sync({force: false})
            // await db.authenticate()
            console.log('Database mysql online')
            console.log("All models were synchronized successfully.");
        } catch (error) {
            throw new Error('Error al conectar DB', error)
        }
    }

    middlewares() {

        //CORS
        this.app.use(cors({
            origin: this.whitelist
        }))

        this.app.use( express.json() )

        this.app.use( express.static('public'))



        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true //Automatically creates the directory path specified in .mv(filePathName)
        }));
    }

    routes() {
        this.app.use(this.path.users, User),
        this.app.use(this.path.products, Product)
        this.app.use(this.path.features, Features )
        this.app.use(this.path.collections, Collection)
        this.app.use(this.path.shippingInfo, ShippingInfo)
        this.app.use(this.path.orders, Orders)
        this.app.use(this.path.payments, Payment)
        this.app.use(this.path.uploads, ImageProduct)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server its running on port ${this.port}`)
        })
    }
}

export default Server