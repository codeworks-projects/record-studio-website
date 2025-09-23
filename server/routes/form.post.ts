import AWS from 'aws-sdk'

export const aws_ses = {
  verified_sender: {
    name: 'Record Studio',
    email: ' no-reply@codeworks.build',
  },
  templates: {
    CONTACT_FORM: 'RECORD_ContactForm',
    CONTACT_FORM_ADMIN: 'RECORD_ContactFormAdmin',
  },
}

const companyEmailInfo = {
  companyName: 'Record Studio S.R.L.',
  companyVAT: '03150280216',
  companyAddress: 'Via Tullio Piccinini 35, 31033 Castelfranco Veneto, TV',
  supportEmail: 'info@recordstudio.it',
}

let server: AWS.SES | null = null

function initServer(accessKeyId: string, secretAccessKey: string) {
  if (!server) {
    server = new AWS.SES({
      accessKeyId,
      secretAccessKey,
      region: 'eu-west-1',
    })
  }
}

export default defineEventHandler(async (event) => {
  const { awsAccessKeyId, awsSecretAccessKey } = useRuntimeConfig()
  initServer(awsAccessKeyId as string, awsSecretAccessKey as string)

  const body = await readBody(event)

  try {
    const dynamicTemplateData = {
      ...body,
      ...companyEmailInfo,
    }

    const params: AWS.SES.SendTemplatedEmailRequest[] = [
      {
        Source: `${aws_ses.verified_sender.name} <${aws_ses.verified_sender.email}>`,
        Destination: {
          ToAddresses: [body.email],
        },
        Template: aws_ses.templates.CONTACT_FORM,
        TemplateData: JSON.stringify(dynamicTemplateData),
      },
      {
        Source: `${aws_ses.verified_sender.name} <${aws_ses.verified_sender.email}>`,
        Destination: {
          ToAddresses: ['info@recordstudio.it'],
        },
        Template: aws_ses.templates.CONTACT_FORM_ADMIN,
        TemplateData: JSON.stringify(dynamicTemplateData),
      },
    ]

    for (const param of params) {
      const result = await server!.sendTemplatedEmail(param).promise()
      if (result.$response.error) throw result.$response.error
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
})
