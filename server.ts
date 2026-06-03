import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import * as z from "zod/v4";
import * as http from "http";
import dotenv from "dotenv";

dotenv.config();

type ToolInputField = {
  type: string;
  required: boolean;
  description: string;
};

type ToolRoute = {
  id: string;
  description: string;
  kind: "query" | "mutation" | "workflow_trigger";
  inputFields: Record<string, ToolInputField>;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  executable: boolean;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "ALL" | null;
  endpoint: string | null;
  requiresHumanConfirmation: boolean;
};

const TOOLS: ToolRoute[] = [
  {
    "id": "book_reservation",
    "description": "Customer can book a dining reservation by providing name, email, phone, date, time, number of guests, and special requests. Returns reservation confirmation with table number and confirmation code.",
    "kind": "mutation",
    "inputFields": {
      "name": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"name\"."
      },
      "email": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"email\"."
      },
      "phone": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"phone\"."
      },
      "date": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"date\"."
      },
      "time": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"time\"."
      },
      "guests": {
        "type": "number",
        "required": true,
        "description": "Observed in intercepted request body field \"guests\"."
      },
      "specialRequests": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"specialRequests\"."
      }
    },
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Observed in intercepted request body field \"name\"."
        },
        "email": {
          "type": "string",
          "description": "Observed in intercepted request body field \"email\"."
        },
        "phone": {
          "type": "string",
          "description": "Observed in intercepted request body field \"phone\"."
        },
        "date": {
          "type": "string",
          "description": "Observed in intercepted request body field \"date\"."
        },
        "time": {
          "type": "string",
          "description": "Observed in intercepted request body field \"time\"."
        },
        "guests": {
          "type": "number",
          "description": "Observed in intercepted request body field \"guests\"."
        },
        "specialRequests": {
          "type": "string",
          "description": "Observed in intercepted request body field \"specialRequests\"."
        }
      },
      "required": [
        "name",
        "email",
        "phone",
        "date",
        "time",
        "guests",
        "specialRequests"
      ],
      "additionalProperties": false
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "reservationId": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "date": {
          "type": "string"
        },
        "time": {
          "type": "string"
        },
        "guests": {
          "type": "number"
        },
        "tableNumber": {
          "type": "number"
        },
        "confirmationCode": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "executable": true,
    "method": "POST",
    "endpoint": "/api/reservations",
    "requiresHumanConfirmation": false
  },
  {
    "id": "place_order",
    "description": "Customer can place a food order with items, quantities, pricing, customer details, order type (dine-in or delivery), and delivery address if applicable. Returns order confirmation with order ID, estimated time, and total.",
    "kind": "mutation",
    "inputFields": {
      "items[].itemId": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"items[].itemId\"."
      },
      "items[].name": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"items[].name\"."
      },
      "items[].quantity": {
        "type": "number",
        "required": true,
        "description": "Observed in intercepted request body field \"items[].quantity\"."
      },
      "items[].price": {
        "type": "number",
        "required": true,
        "description": "Observed in intercepted request body field \"items[].price\"."
      },
      "customerName": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"customerName\"."
      },
      "orderType": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"orderType\"."
      },
      "tableNumber": {
        "type": "number",
        "required": true,
        "description": "Observed in intercepted request body field \"tableNumber\"."
      },
      "deliveryAddress": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"deliveryAddress\"."
      }
    },
    "inputSchema": {
      "type": "object",
      "properties": {
        "items[].itemId": {
          "type": "string",
          "description": "Observed in intercepted request body field \"items[].itemId\"."
        },
        "items[].name": {
          "type": "string",
          "description": "Observed in intercepted request body field \"items[].name\"."
        },
        "items[].quantity": {
          "type": "number",
          "description": "Observed in intercepted request body field \"items[].quantity\"."
        },
        "items[].price": {
          "type": "number",
          "description": "Observed in intercepted request body field \"items[].price\"."
        },
        "customerName": {
          "type": "string",
          "description": "Observed in intercepted request body field \"customerName\"."
        },
        "orderType": {
          "type": "string",
          "description": "Observed in intercepted request body field \"orderType\"."
        },
        "tableNumber": {
          "type": "number",
          "description": "Observed in intercepted request body field \"tableNumber\"."
        },
        "deliveryAddress": {
          "type": "string",
          "description": "Observed in intercepted request body field \"deliveryAddress\"."
        }
      },
      "required": [
        "items[].itemId",
        "items[].name",
        "items[].quantity",
        "items[].price",
        "customerName",
        "orderType",
        "tableNumber",
        "deliveryAddress"
      ],
      "additionalProperties": false
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "orderId": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "estimatedMinutes": {
          "type": "number"
        },
        "total": {
          "type": "number"
        },
        "items[].itemId": {
          "type": "string"
        },
        "items[].name": {
          "type": "string"
        },
        "items[].quantity": {
          "type": "number"
        },
        "items[].price": {
          "type": "number"
        },
        "customerName": {
          "type": "string"
        },
        "orderType": {
          "type": "string"
        },
        "timestamp": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "executable": true,
    "method": "POST",
    "endpoint": "/api/order",
    "requiresHumanConfirmation": false
  },
  {
    "id": "send_message",
    "description": "Customer can send a contact message with name, email, subject, and message content to the restaurant.",
    "kind": "mutation",
    "inputFields": {
      "name": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"name\"."
      },
      "email": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"email\"."
      },
      "subject": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"subject\"."
      },
      "message": {
        "type": "string",
        "required": true,
        "description": "Observed in intercepted request body field \"message\"."
      }
    },
    "inputSchema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Observed in intercepted request body field \"name\"."
        },
        "email": {
          "type": "string",
          "description": "Observed in intercepted request body field \"email\"."
        },
        "subject": {
          "type": "string",
          "description": "Observed in intercepted request body field \"subject\"."
        },
        "message": {
          "type": "string",
          "description": "Observed in intercepted request body field \"message\"."
        }
      },
      "required": [
        "name",
        "email",
        "subject",
        "message"
      ],
      "additionalProperties": false
    },
    "outputSchema": {
      "type": "object",
      "properties": {}
    },
    "executable": true,
    "method": "POST",
    "endpoint": "/api/contact",
    "requiresHumanConfirmation": false
  },
  {
    "id": "get_reservations",
    "description": "Query existing reservations data from the system.",
    "kind": "query",
    "inputFields": {},
    "inputSchema": {
      "type": "object",
      "properties": {},
      "required": [],
      "additionalProperties": false
    },
    "outputSchema": {
      "type": "object",
      "properties": {
        "availableTimes": {
          "type": "array"
        },
        "maxPartySize": {
          "type": "number"
        },
        "advanceBookingDays": {
          "type": "number"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "executable": true,
    "method": "GET",
    "endpoint": "/api/reservations",
    "requiresHumanConfirmation": false
  }
];
const TOOL_BY_ID = new Map(TOOLS.map((tool) => [tool.id, tool]));
const DEFAULT_CUSTOMER_API_BASE_URL = "https://pizza-test-app-jade.vercel.app";
const PORT = Number(process.env.PORT ?? 3000);

function createMcpServer() {
  const server = new McpServer({
    name: "napoli-pizzeria-mcp",
    version: "0.1.0",
  });

  for (const tool of TOOLS) {
    server.registerTool(
      tool.id,
      {
        description: tool.description,
        inputSchema: zodSchemaFromFields(tool.inputFields),
      },
      async (args) => invokeTool(tool, args as Record<string, unknown>)
    );
  }

  return server;
}

function zodSchemaFromFields(fields: Record<string, ToolInputField>) {
  const shape: Record<string, any> = {};
  for (const [name, field] of Object.entries(fields)) {
    let schema: any = zodTypeFor(field.type);
    if (field.description) schema = schema.describe(field.description);
    if (!field.required) schema = schema.optional();
    shape[name] = schema;
  }
  return z.object(shape);
}

function zodTypeFor(type: string) {
  if (/number|float|integer|int|decimal/i.test(type)) return z.number();
  if (/boolean|bool/i.test(type)) return z.boolean();
  if (/array/i.test(type)) return z.array(z.unknown());
  return z.string();
}

async function invokeTool(tool: ToolRoute, args: Record<string, unknown>) {
  const declaredTool = TOOL_BY_ID.get(tool.id);
  if (!declaredTool) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Unknown tool: ${tool.id}` }],
    };
  }

  if (!tool) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: "Unknown tool" }],
    };
  }

  if (!tool.executable || !tool.endpoint || !tool.method) {
    return {
      isError: true,
      content: [
        {
          type: "text" as const,
          text: [
            `TODO: ${tool.id} is present in the ASP spec but has no executable customer API binding yet.`,
            "Add endpoint, method, credentials, and data-source wiring before production use.",
          ].join("\n"),
        },
      ],
    };
  }

  const baseUrl = process.env.CUSTOMER_API_BASE_URL || DEFAULT_CUSTOMER_API_BASE_URL;

  // TODO: replace this generic proxy with customer-specific SDK/API integration when available.
  // TODO: add OAuth/API-key handling if the reviewed ASP spec marks an action as authenticated.
  const url = new URL(tool.endpoint, baseUrl);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.CUSTOMER_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.CUSTOMER_API_TOKEN}`;
  }

  const init: RequestInit = {
    method: tool.method,
    headers,
  };

  if (tool.method === "GET") {
    for (const [key, value] of Object.entries(args)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }
  } else {
    init.body = JSON.stringify(args);
  }

  if (tool.requiresHumanConfirmation && process.env.ENABLE_MUTATIONS !== "true") {
    return {
      isError: true,
      content: [
        {
          type: "text" as const,
          text: "TODO: mutation tools require human confirmation. Set ENABLE_MUTATIONS=true only after adding confirmation UX/policy checks.",
        },
      ],
    };
  }

  const response = await fetch(url, init);
  const text = await response.text();
  let payload: unknown = text;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    // Keep raw text when the customer API does not return JSON.
  }

  return {
    isError: !response.ok,
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            action_id: tool.id,
            status: response.status,
            data: payload,
          },
          null,
          2
        ),
      },
    ],
  };
}

const httpServer = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }

    if (req.method === "POST" && req.url === "/mcp") {
      const server = createMcpServer();
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
      await server.connect(transport);
      await transport.handleRequest(req, res);
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found. POST to /mcp" }));
  } catch (error) {
    console.error("MCP request failed", error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify({ error: "MCP request failed" }));
  }
});

httpServer.listen(PORT, () => {
  console.log("napoli-pizzeria-mcp listening on http://0.0.0.0:" + PORT + "/mcp");
});
