package com.javasampleapproach.springrest.postgresql.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javasampleapproach.springrest.postgresql.model.EtatCivil;
import com.javasampleapproach.springrest.postgresql.repo.EtatCivilRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EtatCivilController {

	@Autowired
	EtatCivilRepository repository;
	
	
	@GetMapping("/etatCivils")
	public List<EtatCivil> getAll() {
		
		List<EtatCivil> etatCivils = repository.findAll();
		Collections.sort(etatCivils, (ec1, ec2) -> ec1.getId().compareTo(ec2.getId()));
		
		return etatCivils;
	}
	@PostMapping(value = "/etatCivils/create")
	public EtatCivil postEtatCivil(@RequestBody EtatCivil etatCivil) {

		EtatCivil _etatCivil = new EtatCivil(etatCivil.getNom(), etatCivil.getPrenom(), etatCivil.getEmail(), etatCivil.getTelephone());
		_etatCivil = repository.save(_etatCivil);
		
		return _etatCivil;
	}
	@DeleteMapping("/etatCivils/{id}")
	public void deleteEtatCivil(@PathVariable Long id) {
		repository.deleteById(id);
	}
	
	@DeleteMapping("/etatCivils/delete")
	public ResponseEntity<String> deleteAllEtatCivil() {
		repository.deleteAll();

		return new ResponseEntity<>("All etatCivils have been deleted!", HttpStatus.OK);
	}
	
	@GetMapping(value = "etatCivils/findByCriteria/{criteria}")
	public List<EtatCivil> findByCriteria(@PathVariable String criteria) {

		List<EtatCivil> etatCivils = new ArrayList<>();
		String[] criteriaSplited = criteria.split(" ");
		if (criteriaSplited.length == 2 && criteria.length() != criteriaSplited.length) {
			List<EtatCivil> etatCivils1 = repository.findByNomOrPrenom(criteria.toLowerCase());
			etatCivils.addAll(etatCivils1);
			String val1 = criteriaSplited[0];
			String val2 = criteriaSplited[1];
			
			List<EtatCivil> etatCivils2 = repository.findByNomAndPrenom(val1.toLowerCase(), val2.toLowerCase());
			etatCivils.addAll(etatCivils2);
		} else if (criteriaSplited.length == 3 && criteria.length() != criteriaSplited.length) {
			
			String val1 = criteriaSplited[0];
			String val2 = criteriaSplited[1];
			String val3 = criteriaSplited[2];
			
			List<EtatCivil> etatCivils1 = repository.findByNomAndPrenom(val1.toLowerCase()+" "+val2.toLowerCase(), val3.toLowerCase());
			List<EtatCivil> etatCivils2 = repository.findByNomAndPrenom(val1.toLowerCase(), val2.toLowerCase()+" "+val3.toLowerCase());
			List<EtatCivil> etatCivils3 = repository.findByNomAndPrenom(val2.toLowerCase()+" "+val3.toLowerCase(), val1.toLowerCase());
			List<EtatCivil> etatCivils4 = repository.findByNomAndPrenom(val3.toLowerCase(), val1.toLowerCase()+" "+val2.toLowerCase());
			etatCivils.addAll(etatCivils1);
			etatCivils.addAll(etatCivils2);
			etatCivils.addAll(etatCivils3);
			etatCivils.addAll(etatCivils4);
/*			etatCivils = repository.findByNomAndPrenom(val1.toLowerCase(), val2.toLowerCase(), val3.toLowerCase());*/
		}  else if (criteriaSplited.length == 4 && criteria.length() != criteriaSplited.length) {
			
			String val1 = criteriaSplited[0];
			String val2 = criteriaSplited[1];
			String val3 = criteriaSplited[2];
			String val4 = criteriaSplited[3];
			List<EtatCivil> etatCivils1 = repository.findByNomAndPrenom(val1.toLowerCase()+" "+val2.toLowerCase(), val3.toLowerCase()+" "+val4.toLowerCase());
			List<EtatCivil> etatCivils2 = repository.findByNomAndPrenom(val3.toLowerCase()+" "+val4.toLowerCase(), val1.toLowerCase()+" "+val2.toLowerCase());
			etatCivils.addAll(etatCivils1);
			etatCivils.addAll(etatCivils2);

		} else {
			etatCivils = repository.findByNomOrPrenom(criteria.toLowerCase());
		}

		Collections.sort(etatCivils, (ec1, ec2) -> ec1.getId().compareTo(ec2.getId()));
		
		return etatCivils;
	}
	
	@GetMapping(value = "etatCivils/getById/{id}")
	public EtatCivil getById(@PathVariable("id") long id) {

		Optional<EtatCivil> etatCivilData = repository.findById(id);

		if (etatCivilData.isPresent()) {
			return etatCivilData.get();
		} else {
			return null;
		}
	}

	@PutMapping("/etatCivils/update/{id}")
	public ResponseEntity<EtatCivil> updateEtatCivil(@PathVariable("id") long id, @RequestBody EtatCivil etatCivil) {

		Optional<EtatCivil> etatCivilData = repository.findById(id);

		if (etatCivilData.isPresent()) {
			EtatCivil _etatCivil = etatCivilData.get();
			_etatCivil.setNom(etatCivil.getNom());
			_etatCivil.setPrenom(etatCivil.getPrenom());
			_etatCivil.setEmail(etatCivil.getEmail());
			_etatCivil.setTelephone(etatCivil.getTelephone());
			return new ResponseEntity<>(repository.save(_etatCivil), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	/*
	@GetMapping("/etatCivils")
	public Page<EtatCivil> getAllSortByAttribut(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="id") String attribut, @RequestParam(defaultValue="true") boolean asc) {
		
		Direction dir = Direction.ASC;
		if (page == 0) page = 1;
		if (!asc) {
			dir = Direction.DESC;
		}
		Page<EtatCivil> res = repository.findAll(PageRequest.of((page-1), 5, dir, attribut));

		return res;
	}*/
}
