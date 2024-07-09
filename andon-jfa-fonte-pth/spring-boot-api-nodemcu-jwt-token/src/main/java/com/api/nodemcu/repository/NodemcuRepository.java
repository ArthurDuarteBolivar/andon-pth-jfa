package com.api.nodemcu.repository;

import com.api.nodemcu.model.NodemcuModel;
import com.api.nodemcu.model.OperationModel;
import jakarta.transaction.Transactional;
import org.apache.el.stream.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;

//@EnableJpaRepositories
public interface NodemcuRepository extends JpaRepository<NodemcuModel, Integer> {

    List<NodemcuModel> findAll();

     NodemcuModel findByNameId(OperationModel nameId);

    @Modifying
    @Query(value = "UPDATE thdados n SET n.localTC = :newLocalTC WHERE n.nameId = :nameId", nativeQuery = true)
    void updateLocalTCByNameId(@Param("newLocalTC") Integer newLocalTC, @Param("nameId") Integer nameId);

    @Modifying
    @Query(value = "update thdados set state = :newState where nameId = :nameId", nativeQuery = true)
    void updateStateByNameId(@Param("newState") String newState, @Param("nameId") Integer nameId);

    <NodemcuMod extends NodemcuModel> NodemcuMod save(NodemcuMod nodemcu);

}
