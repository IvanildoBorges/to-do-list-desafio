/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { InterfaceTarefa, Tarefa } from '../models/Tarefa';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para listar todas as tarefas
export const listarTarefas = async (): Promise<Tarefa[]> => {
  try {
    const response = await api.get('/tarefas');
    
    if (response.data.sucesso) {
        return response.data.dados.map((tarefa: InterfaceTarefa) => Tarefa.fromJSON(tarefa));
    } else {
        return [];
    }
  } catch (error) {
    throw new Error('Erro ao carregar tarefas!');
  }
};

// Função para listar uma tarefa por ID
export const listarTarefaPorId = async (id: string): Promise<Tarefa> => {
  try {
    const response = await api.get(`/tarefas/tarefa/${id}`);
    return Tarefa.fromJSON(response.data);
  } catch (error) {
    throw new Error('Erro ao buscar tarefa');
  }
};

// Função para listar todas as tarefas concluídas
export const listarTarefasConcluidas = async (): Promise<Tarefa[]> => {
  try {
    const response = await api.get('/tarefas/concluidas');
    return response.data.map((tarefa: InterfaceTarefa) => Tarefa.fromJSON(tarefa));
  } catch (error) {
    throw new Error('Erro ao listar tarefas concluídas');
  }
};

// Função para criar uma nova tarefa
export const criarTarefa = async (tarefa: Tarefa): Promise<Tarefa> => {
  try {
    const tarefaCriada: Tarefa = await api.post('/tarefas/nova', { tarefa })
        .then(response => response.data.dados)
        .then(tarefa => Tarefa.fromJSON(tarefa));
    return tarefaCriada;
  } catch (error) {
    throw new Error('Erro ao criar tarefa! Tente novamente mais tarde.');
  }
};

// Função para atualizar uma tarefa
export const atualizarTarefa = async (id: string, tarefa: Tarefa): Promise<boolean> => {
    try {
        const resposta = await api.put('/tarefas/tarefa/atualizar/', { tarefa }, { params: { id } })
            .then(response => response.data.sucesso);

        return resposta;
    } catch (error) {
        throw new Error('Erro ao atualizar tarefa!');
    }
}

// Função para deletar uma tarefa por ID
export const deletarTarefaPorId = async (id: string): Promise<string> => {
  try {
    return await api.delete(`/tarefas/excluir/`, { params: { id: id } })
        .then(response => response.data.dados);
  } catch (error) {
    throw new Error('Erro ao deletar tarefa');
  }
};

// Função para deletar todas as tarefas
export const deletarTodasTarefas = async (): Promise<void> => {
  try {
    await api.delete('/tarefas/excluir/tudo');
  } catch (error) {
    throw new Error('Erro ao deletar todas as tarefas');
  }
};
