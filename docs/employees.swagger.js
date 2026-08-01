/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Lista todos os funcionários
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de funcionários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Não autenticado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Busca um funcionário pelo ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Funcionário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Funcionário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Cadastra um novo funcionário
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *           example:
 *             name: João Silva
 *             cpf: "11111111111"
 *             email: joao@email.com
 *             phone: "12999999999"
 *             positionId: 1
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autenticado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Atualiza um funcionário
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Funcionário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Remove um funcionário
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Funcionário removido com sucesso.
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Funcionário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */