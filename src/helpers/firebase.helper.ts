import * as admin from 'firebase-admin'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class FirebaseService implements OnModuleInit {
  private static firebaseApp: admin.app.App

  onModuleInit() {
    if (!FirebaseService.firebaseApp) {
      FirebaseService.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_SENDER_ID,
          privateKey: process.env.FIREBASE_SENDER_TOKEN.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_SENDER_EMAIL,
        }),
      })
      console.log('Firebase initialized successfully.')
    }
  }

  async sendPushNotification(token: string, title: string, body: string) {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    }

    try {
      const response = await admin.messaging().send(message)
      console.log('Notification sent:', response)
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  }
}
