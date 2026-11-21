
package com.gerenciador.estagios.service;

import com.gerenciador.estagios.model.Estagio;
import com.gerenciador.estagios.repository.EstagioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EstagioService {

    private final EstagioRepository repository;

    public EstagioService(EstagioRepository repository) {
        this.repository = repository;
    }

    public List<Estagio> listarTodos() {
        return repository.findAll();
    }
    public Estagio salvar(Estagio estagio) {
    return repository.save(estagio);
    }
    public Estagio buscarPorId(Long id) {
    return repository.findById(id).orElseThrow(() -> new RuntimeException("Estágio não encontrado!"));
    }  
    public Estagio atualizar(Long id, Estagio novosDados) {
    Estagio estagio = buscarPorId(id);

    estagio.setEmpresa(novosDados.getEmpresa());
    estagio.setCargo(novosDados.getCargo());
    estagio.setDescricao(novosDados.getDescricao());
    estagio.setDataInicio(novosDados.getDataInicio());
    estagio.setDataFim(novosDados.getDataFim());
    estagio.setStatus(novosDados.getStatus());

    return repository.save(estagio);
    }
    public void excluir(Long id) {
    Estagio estagio = buscarPorId(id);
    repository.delete(estagio);
    }
    public List<Estagio> pesquisarPorEmpresa(String empresa) {
    return repository.findByEmpresaContainingIgnoreCase(empresa);
}

public List<Estagio> ordenarPorDataCrescente() {
    return repository.findAllByOrderByDataInicioAsc();
}

public List<Estagio> ordenarPorDataDecrescente() {
    return repository.findAllByOrderByDataInicioDesc();
}
}

