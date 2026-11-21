package com.gerenciador.estagios.repository;

import com.gerenciador.estagios.model.Estagio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EstagioRepository extends JpaRepository<Estagio, Long> {

    List<Estagio> findByEmpresaContainingIgnoreCase(String empresa);

    List<Estagio> findAllByOrderByDataInicioAsc();

    List<Estagio> findAllByOrderByDataInicioDesc();
}