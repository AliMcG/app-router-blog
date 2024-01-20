/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { FormData } from '@/_components/ContactForm';
import { toast } from "react-hot-toast"

export function sendEmail(data: FormData) {

  const apiEndpoint = '/api/email';
  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      toast.success(response.message as string)
    })
    .catch((err) => {
      toast.error(err as string)
    });
}
