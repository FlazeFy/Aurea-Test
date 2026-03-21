import http from "k6/http"
import { check, sleep } from "k6"

// Performance Test : PERF-FDBC-GAFD-001
// Multiple users see their feedback simultaneously

// Env
const BASE_URL = __ENV.BASE_URL

// Test Config Data
const MAX_P95_RESPONSE_TIME = "800"
const MAX_FAILURE_RATE = "0.01"

export const options = {
    stages: [
        { duration: "30s", target: 1 },  // warm up
        { duration: "60s", target: 4 },  // 75% server's capacity test
        { duration: "60s", target: 4 },  // sustain load
        { duration: "30s", target: 0 },  // ramp down
    ],
    thresholds: {
        http_req_duration: [`p(95)<${MAX_P95_RESPONSE_TIME}`],
        http_req_failed: [`rate<${MAX_FAILURE_RATE}`],
    },
}

export default function () {
    // Prepare the endpoint
    const url = `${BASE_URL}/api/v1/feedbacks`
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    }

    // Exec the endpoint
    const res = http.get(url, params)

    // Check response
    check(res, {
        "status is 200": (r) => r.status === 200,
        "get all feedback success": (r) => r.json("message") === "Get feedback successful",
    })

    // Pause before next iteration
    sleep(1)
}