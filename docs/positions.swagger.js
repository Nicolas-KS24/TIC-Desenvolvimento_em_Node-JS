/**
 * @swagger
 * /positions:
 *   get:
 *     summary: Lista todos os cargos
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cargos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Position'
 *       401:
 *         description: Não autenticado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /positions/{id}:
 *   get:
 *     summary: Busca um cargo pelo ID
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cargo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cargo encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Position'
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Cargo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /positions:
 *   post:
 *     summary: Cadastra um novo cargo
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Position'
 *           example:
 *             title: Backend Developer
 *             salary: 6500
 *     responses:
 *       201:
 *         description: Cargo criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autenticado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /positions/{id}:
 *   put:
 *     summary: Atualiza um cargo
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cargo
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Position'
 *     responses:
 *       200:
 *         description: Cargo atualizado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Cargo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /positions/{id}:
 *   delete:
 *     summary: Remove um cargo
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cargo
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cargo removido com sucesso.
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Cargo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */