# Desenvolvimento de um Sistema de Autenticação Robusto com NestJS

Este projeto teve como objetivo a criação de um sistema de login robusto e escalável, oferecendo uma experiência de autenticação segura e fluida aos usuários. A aplicação foi desenhada para garantir conformidade com padrões modernos de segurança e boas práticas, incorporando as seguintes funcionalidades principais:

- **Gestão de Usuários:** criação, atualização, exclusão e listagem de contas;
- **Autenticação Segura:** uso de *JSON Web Tokens* (JWT) para autenticar e proteger sessões;

- **Manutenção de Sessão:** implementação de Refresh Tokens para prolongar a validade do login sem necessidade de reautenticação contínua;

- **Ativação de Conta:** sistema de verificação por e-mail, integrando serviços de envio como SendGrid ou Nodemailer.

Durante o desenvolvimento, utilizei o NestJS como framework central, que se provou eficaz por sua arquitetura modular, orientada a microsserviços, facilitando a escalabilidade e a manutenção do código. Entre os recursos que explorei no NestJS, destaco:

- **Pipes:** utilizados para transformar e validar dados de forma eficiente;

- **Interceptors:** aplicados para modificação de respostas e implementação de lógica comum de forma centralizada;

- **Middlewares:** responsáveis por processos pré-roteamento, como a verificação de autenticação e logging;

- **Exception Filters:** implementados para capturar e tratar erros com respostas customizadas;

- **Guards:** empregados para proteger rotas sensíveis, garantindo que apenas usuários autorizados as acessem;

- **Params:** usados para a manipulação avançada de parâmetros nas rotas.

Outro desafio relevante foi a integração com sistemas de mensageria. Para isso, utilizei o *Redis* como banco de dados de chave-valor em memória para armazenar dados voláteis e coordenar o envio de notificações aos usuários. Além disso, o Redis também foi usado como suporte para simular um microsserviço dedicado ao envio de notificações, ampliando a robustez do sistema.

Na área de injeção de dependências, utilizei os mecanismos do NestJS, criando decorators personalizados, o que aumentou a modularidade e a reutilização de código em toda a aplicação. A documentação da API foi feita utilizando Swagger, garantindo uma interface detalhada e interativa para desenvolvedores que consumirão as rotas e endpoints da aplicação.

##### Tecnologias Empregadas
Além dos recursos do NestJS, o projeto integrou um conjunto de tecnologias modernas:

- TypeScript: utilizado para trazer tipagem estática ao código, aumentando a segurança e a escalabilidade do projeto;
- PrismaORM: empregado para a interação com o banco de dados, facilitando a criação e gestão de entidades, migrações e consultas complexas;
- PostgreSQL: escolhido como banco de dados relacional por sua confiabilidade e suporte a operações complexas;

- Redis: não só como cache e sistema de mensageria, mas também para simular a arquitetura de microsserviços;
- Docker: aplicado para garantir ambientes de desenvolvimento e produção consistentes, facilitando o deployment;
- Git e GitHub: para controle de versão e colaboração, seguindo um fluxo de desenvolvimento baseado em branches para entrega contínua.
 

Esse projeto foi uma experiência de grande aprendizado, permitindo-me alcançar todos os objetivos que havia estabelecido no início do desafio. Durante o desenvolvimento, aprimorei minhas habilidades técnicas e adquiri conhecimentos valiosos, que serão muito uteis em minha jornada.

'Para o futuro, planejo expandir a aplicação com novas funcionalidades, como autenticação via redes sociais, e também um Front-End básico para uma melhor visualização das funcionalidades.