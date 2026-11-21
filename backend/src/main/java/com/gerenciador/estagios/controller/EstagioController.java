
package com.gerenciador.estagios.controller;

import com.gerenciador.estagios.model.Estagio;
import com.gerenciador.estagios.service.EstagioService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/estagios")
public class EstagioController {

    private final EstagioService service;

    public EstagioController(EstagioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Estagio> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    public Estagio salvar(@Valid @RequestBody Estagio estagio) {
        return service.salvar(estagio);
    }

    @GetMapping("/{id}")
    public Estagio buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Estagio atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Estagio estagio) {
        return service.atualizar(id, estagio);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }

    @GetMapping("/pesquisar")
    public List<Estagio> pesquisarPorEmpresa(@RequestParam String empresa) {
        return service.pesquisarPorEmpresa(empresa);
    }

    @GetMapping("/ordenar")
    public List<Estagio> ordenarPorData(@RequestParam String ordem) {

        if (ordem.equalsIgnoreCase("crescente")) {
            return service.ordenarPorDataCrescente();
        }

        if (ordem.equalsIgnoreCase("decrescente")) {
            return service.ordenarPorDataDecrescente();
        }

        throw new IllegalArgumentException("Ordem inválida!");
    }
}
