import http from 'k6/http';
import { check, sleep } from 'k6';
import { generateProduct } from '../utilitarios/produtos-fakers.js'; // ajuste o caminho conforme necessário;

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<800'],   // 95% das requisições abaixo de 800ms
    http_req_failed: ['rate<0.05'],     // até 5% de falhas permitidas
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://sua-api.com'; // defina sua URL real aqui

export default function () {
  const payload = JSON.stringify(generateProduct());

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post(`${BASE_URL}/produtos`, payload, { headers });

  check(res, {
    'status é 201 (Created)': (r) => r.status === 201,
    'resposta contém id': (r) => r.body && JSON.parse(r.body).id !== undefined,
  });

  sleep(1);
}
