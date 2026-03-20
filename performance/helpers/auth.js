import http from "k6/http"
import { check } from "k6"

// Credentials
const BASE_URL = __ENV.BASE_URL
const EMAIL = __ENV.K6_LOGIN_EMAIL
const PASSWORD = __ENV.K6_LOGIN_PASSWORD

export function loginHelper() {
    // Prepare the endpoint
    const url = `${BASE_URL}/api/v1/auth/login`
    const payload = JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
    })
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    }

    // Exec the endpoint
    const res = http.post(url, payload, params)

    // Check response
    check(res, {
        "login status 200": (r) => r.status === 200,
        "login success": (r) => r.json("message") === "Login successful",
    })

    // Extract token
    const token = res.json("data.token")
    
    return token
}