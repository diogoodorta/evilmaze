using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Mover : MonoBehaviour
{

    private Vector3 entradaJogador;
    private CharacterController characterController;
    private float velociJogador = 5f;

    private void Awake()
    {
       characterController = GetComponent<CharacterController>();
    }

    // Update is called once per frame
    void Update()
    {
        entradaJogador = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
        
        characterController.Move(entradaJogador * Time.deltaTime * velociJogador);
    }
}
