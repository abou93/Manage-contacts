package com.javasampleapproach.springrest.postgresql.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.javasampleapproach.springrest.postgresql.model.EtatCivil;

public interface EtatCivilRepository extends JpaRepository<EtatCivil, Long> {
//	List<EtatCivil> findByRegex(String regex);
	
	@Query(nativeQuery=true, value="select * from etat_civil ec where "
			+ "(lower(ec.nom) like %:value% OR lower(ec.prenom) like %:value%) ")
	List<EtatCivil> findByNomOrPrenom(@Param("value") String value);
	
	@Query(nativeQuery=true, value="select * from etat_civil ec where "
			+ "lower(ec.nom) like %:val1% and lower(ec.prenom) like %:val2% OR "
			+ "lower(ec.nom) like %:val2% and lower(ec.prenom) like %:val1% ")
	List<EtatCivil> findByNomAndPrenom(@Param("val1") String val1, @Param("val2") String val2);
}
