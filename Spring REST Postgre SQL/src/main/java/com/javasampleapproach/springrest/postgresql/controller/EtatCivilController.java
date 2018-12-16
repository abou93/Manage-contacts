package com.javasampleapproach.springrest.postgresql.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
/*
	@GetMapping("/etatCivils")
	public List<EtatCivil> getAllEtatCivils() {
		System.out.println("Get all EtatCivils...");

		List<EtatCivil> etatCivils = new ArrayList<>();
		repository.findAll().forEach(etatCivils::add);
		Collections.sort(etatCivils, (ec1, ec2) -> ec1.getId().compareTo(ec2.getId()));

		return etatCivils;
	}
*/
	@GetMapping("/etatCivils")
	public Page<EtatCivil> getAll() {
		System.out.println("Get all EtatCivils...");

		List<EtatCivil> etatCivils = new ArrayList<>();
		Page<EtatCivil> res = repository.findAll(new PageRequest(0, 5));
		res.getContent().forEach(etatCivils::add);
		Collections.sort(etatCivils, (ec1, ec2) -> ec1.getId().compareTo(ec2.getId()));

		return res;
	}

	@PostMapping(value = "/etatCivils/create")
	public EtatCivil postEtatCivil(@RequestBody EtatCivil etatCivil) {

		EtatCivil _etatCivil = new EtatCivil(etatCivil.getNom(), etatCivil.getPrenom(), etatCivil.getEmail(), etatCivil.getTelephone());
		_etatCivil = repository.save(_etatCivil);
		
		return _etatCivil;
	}
	@DeleteMapping("/etatCivils/{id}")
	public void deleteEtatCivil(@PathVariable Long id) {
		System.out.println("Delete EtatCivil with ID = " + id + "...");
		repository.deleteById(id);
	}
	
	@DeleteMapping("/etatCivils/delete")
	public ResponseEntity<String> deleteAllEtatCivil() {
		System.out.println("Delete All EtatCivils...");

		repository.deleteAll();

		return new ResponseEntity<>("All etatCivils have been deleted!", HttpStatus.OK);
	}
	
	@GetMapping(value = "etatCivils/findByCriteria/{criteria}")
	public List<EtatCivil> findByCriteria(@PathVariable String criteria) {

		List<EtatCivil> etatCivils = null;
		String[] criteriaSplited = criteria.split(" ");
		if (criteriaSplited.length == 2 && criteria.length() != criteriaSplited.length) {
			String val1 = criteriaSplited[0];
			String val2 = criteriaSplited[1];
			etatCivils = repository.findByNomAndPrenom(val1.toLowerCase(), val2.toLowerCase());
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
		System.out.println("Update EtatCivil with ID = " + id + "...");

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
}
