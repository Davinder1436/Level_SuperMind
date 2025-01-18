// src/routes/chat.routes.ts
import { Router, Request, Response } from 'express';
import WebSocket from 'ws';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Store WebSocket connections
const connections = new Map<string, WebSocket>();

// Types
interface ChatRequest {
  input_value: string;
  requestId: string;
}

interface LangflowRequest {
  input_value: string;
  output_type: string;
  input_type: string;
  tweaks: {
    [key: string]: Record<string, unknown>;
  }
}

interface ChatResponse {
  outputs: Array<{
    outputs: Array<{
      results: {
        message: {
          text: string;
        }
      }
    }>
  }>;
}

// WebSocket setup function
export function setupWebSocket(wss: WebSocket.Server): void {
  wss.on('connection', (ws: WebSocket) => {
    const requestId = Math.random().toString(36).substring(7);
    connections.set(requestId, ws);

    ws.on('close', () => {
      connections.delete(requestId);
    });

    ws.send(JSON.stringify({ type: 'requestId', requestId }));
  });
}

// Chat handler
const handleChat = async (req: Request<{}, {}, ChatRequest>, res: Response): Promise<void> => {
  const { input_value, requestId } = req.body;
  const ws = connections.get(requestId);

  if (!ws) {
    res.status(400).json({ error: 'WebSocket connection not found' });
    return;
  }

  try {
    const requestData: LangflowRequest = {
      input_value,
      output_type: 'chat',
      input_type: 'chat',
      tweaks: {
        "ParseData-bU2Lk": {},
        "SplitText-s45X9": {},
        "OpenAIModel-Bunci": {},
        "ChatOutput-8sI0F": {},
        "AstraDB-66x6b": {},
        "File-j3YRd": {},
        "ChatInput-iAwEu": {},
        "CombineText-1kBZ6": {},
        "TextInput-upHmt": {}
      }
    };

    const response = await axios.post<ChatResponse>(
      'https://api.langflow.astra.datastax.com/lf/882442eb-1aec-4e92-9580-e016227c9bfb/api/v1/run/aff859dc-c8dd-46d3-af3d-7c6105b4f213?stream=false',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ASTRA_API_TOKEN}`
        }
      }
    );

    const message = response.data.outputs[0].outputs[0].results.message.text;
    ws.send(JSON.stringify({ type: 'response', message }));
    res.json({ status: 'Processing' });

  } catch (error: any) {
    ws.send(JSON.stringify({ type: 'error', message: error.message }));
    res.status(500).json({ error: error.message });
  }
};

router.post('/chat', handleChat);

export default router;
