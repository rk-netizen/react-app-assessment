import { http, HttpResponse, HttpHandler } from "msw";

export const handlers: HttpHandler[] = [
    http.post("/api/sign-pdf", async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get("pdf");
        return new HttpResponse(file as Blob, {
            status: 200,
            headers: { "Content-Type": "application/pdf" },
        });
    }),
];
