/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { FormData } from '@/_components/ContactForm';

export function sendEmail(data: FormData) {
  // TODO: send email
  console.log(data);
  const apiEndpoint = '/api/email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}
