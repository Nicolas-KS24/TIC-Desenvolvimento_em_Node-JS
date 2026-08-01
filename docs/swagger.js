const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Software House API",
            version: "1.0.0",
            description: "API REST desenvolvida em Node.js utilizando Express, Sequelize e MySQL."
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Servidor local"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                Login: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            example: "admin@email.com"
                        },
                        password: {
                            type: "string",
                            example: "123456"
                        }
                    }
                },

                User: {
                    type: "object",
                    required: [
                        "name",
                        "password"
                    ],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        name: {
                            type: "string",
                            example: "admin"
                        },
                        password: {
                            type: "string",
                            example: "123456"
                        }
                    }
                },

                Login: {
                    type: "object",
                    required: [
                        "name",
                        "password"
                    ],
                    properties: {
                        name: {
                            type: "string",
                            example: "admin"
                        },
                        password: {
                            type: "string",
                            example: "123456"
                        }
                    }
                },

                Position: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        title: {
                            type: "string",
                            example: "Backend Developer"
                        },
                        salary: {
                            type: "number",
                            example: 5000
                        }
                    }
                },

                Employee: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        name: {
                            type: "string",
                            example: "João Silva"
                        },
                        hireDate: {
                            type: "new Date()"
                        },
                        positionId: {
                            type: "integer",
                            example: 1
                        }
                    }
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: [
        "./docs/*.js"
    ]
};



module.exports = swaggerJsDoc(swaggerOptions);