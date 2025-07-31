import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,             // usuários simultâneos
  duration: '30s',     // duração do teste
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem responder em menos de 500ms
    http_req_failed: ['rate<0.01'],   // menos de 1% de falhas
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  // Validações essenciais
  check(res, {
    'status é 200': (r) => r.status === 200,
    'resposta é JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    'contém ao menos um post': (r) => JSON.parse(r.body).length > 0,
    'cada post tem userId e title': (r) => {
      const posts = JSON.parse(r.body);
      return posts.every(post => post.userId && post.title);
    },
  });

  sleep(1); // simula tempo de espera entre requisições
}
