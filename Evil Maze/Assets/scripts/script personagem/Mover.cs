using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Mover : MonoBehaviour
{

    private Vector3 entradaJogador;
    private CharacterController characterController;
    private float velociJogador = 10f;
    private Transform myCamera;

    private bool estanoChao;
    [SerializeField] private Transform verificaChao;
    [SerializeField] private LayerMask cenarioMask;
    
    [SerializeField] private float alturaSalto = 10f;
    private float gravidade = -9.81f;
    private float velociVertical;


    private void Awake()

    {
       characterController = GetComponent<CharacterController>();
     
       myCamera = Camera.main.transform;
    }

   // Start is called before the first frame update
        void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
    }

    // Update is called once per frame
    void Update()
    {
        transform.eulerAngles = new Vector3(transform.eulerAngles.x, myCamera.eulerAngles.y, transform.eulerAngles.z);

        entradaJogador = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
        entradaJogador = transform.TransformDirection(entradaJogador);
        
        characterController.Move(entradaJogador * Time.deltaTime * velociJogador);
 
        estanoChao = Physics.CheckSphere(verificaChao.position, 0.3f, cenarioMask);

        if(Input.GetKeyDown(KeyCode.Space) && estanoChao)
        {
           velociVertical = Mathf.Sqrt(alturaSalto * -2f * gravidade);
        }

        if(estanoChao && velociVertical < 0)
        {
          velociVertical = -1f;
        }

        velociVertical += gravidade * Time.deltaTime;
        
        characterController.Move(new Vector3(0, velociVertical, 0) * Time.deltaTime);
    }
}
